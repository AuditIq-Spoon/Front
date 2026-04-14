import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';
import {
  AuditSession,
  WsProgressEvent,
  WsResultEvent,
  AnomalyFlag,
  AnomalySeverity,
  riskColor,
  riskLabel,
  riskBadgeClass,
} from '../../core/models/audit.models';

interface StepState {
  label: string;
  detail: string | null;
  status: 'PENDING' | 'RUNNING' | 'DONE' | 'ERROR';
  timestamp?: string;
}

@Component({
  selector: 'app-live-audit',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header -->
      <div class="mb-8 flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <a routerLink="/dashboard" class="text-xs text-foreground/40 hover:text-foreground/70 transition-colors">
              ← Dashboard
            </a>
          </div>
          <h1 class="text-3xl font-semibold text-foreground">Live Audit</h1>
          <p class="mt-1 text-sm text-foreground/50 font-mono">Session {{ sessionId | slice:0:8 }}…</p>
        </div>

        <!-- Status badge -->
        <div *ngIf="session" class="shrink-0">
          <span [ngClass]="statusBadge(session.status)" class="text-sm px-3 py-1">
            {{ session.status }}
          </span>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="!session && !loadError" class="space-y-4" aria-busy="true" aria-label="Loading session">
        <div class="card h-24 animate-pulse bg-muted/50"></div>
        <div class="card h-48 animate-pulse bg-muted/50"></div>
      </div>

      <!-- Load error -->
      <div *ngIf="loadError" class="card flex flex-col items-center gap-4 py-16 text-center" role="alert">
        <svg class="h-10 w-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p class="text-base font-medium text-foreground">{{ loadError }}</p>
        <a routerLink="/dashboard" class="btn-secondary text-sm">Back to Dashboard</a>
      </div>

      <ng-container *ngIf="session">

        <!-- Session info card -->
        <div class="card p-5 mb-6">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Audit Type</p>
              <span class="text-sm font-semibold"
                    [class.text-blue-400]="session.audit_type === 'INOUT'"
                    [class.text-purple-400]="session.audit_type === 'TENDER'">
                {{ session.audit_type }}
              </span>
            </div>
            <div *ngIf="session.audit_type === 'INOUT'">
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Date Range</p>
              <p class="text-sm tabular">{{ session.params['start_date'] }} → {{ session.params['end_date'] }}</p>
            </div>
            <div *ngIf="session.audit_type === 'TENDER'">
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Project</p>
              <p class="text-sm">{{ session.params['project_name'] }}</p>
            </div>
            <div>
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Created</p>
              <p class="text-sm tabular">{{ formatDate(session.created_at) }}</p>
            </div>
          </div>
        </div>

        <!-- Progress terminal -->
        <div class="card mb-6">
          <div class="flex items-center justify-between px-5 py-3 border-b border-border">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <span class="h-3 w-3 rounded-full bg-destructive/80"></span>
                <span class="h-3 w-3 rounded-full bg-risk-medium/80"></span>
                <span class="h-3 w-3 rounded-full bg-accent/80"></span>
              </div>
              <span class="text-xs font-mono text-foreground/40 ml-2">audit-pipeline</span>
            </div>
            <div *ngIf="isRunning" class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span class="text-xs text-accent font-medium">Live</span>
            </div>
          </div>

          <!-- Steps -->
          <div class="p-5 space-y-3" role="log" aria-live="polite" aria-label="Audit progress">
            <div
              *ngFor="let step of steps; let i = index; trackBy: trackByIndex"
              class="flex items-start gap-3 transition-all duration-300"
              [class.opacity-30]="step.status === 'PENDING'"
              [class.animate-fade-in]="step.status !== 'PENDING'"
            >
              <!-- Step icon -->
              <div class="mt-0.5 shrink-0">
                <ng-container [ngSwitch]="step.status">
                  <svg *ngSwitchCase="'DONE'" class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-label="Completed">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <svg *ngSwitchCase="'RUNNING'" class="h-5 w-5 text-accent animate-spin" fill="none" viewBox="0 0 24 24" aria-label="Running">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg *ngSwitchCase="'ERROR'" class="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-label="Error">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <div *ngSwitchDefault class="h-5 w-5 rounded-full border-2 border-border flex items-center justify-center">
                    <span class="text-xs font-mono text-foreground/30">{{ i + 1 }}</span>
                  </div>
                </ng-container>
              </div>

              <!-- Step content -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium"
                   [ngClass]="{
                     'text-foreground': step.status !== 'PENDING',
                     'text-foreground/30': step.status === 'PENDING'
                   }">
                  {{ step.label }}
                </p>
                <p *ngIf="step.detail" class="mt-0.5 text-xs font-mono text-foreground/40">
                  {{ step.detail }}
                </p>
              </div>

              <!-- Timestamp -->
              <span *ngIf="step.timestamp && step.status === 'DONE'"
                    class="shrink-0 text-xs tabular text-foreground/30">
                {{ formatTime(step.timestamp) }}
              </span>
            </div>

            <!-- Indeterminate progress bar when running -->
            <div *ngIf="isRunning" class="mt-4 relative h-0.5 w-full bg-muted overflow-hidden rounded-full">
              <div class="absolute h-full w-1/3 bg-accent rounded-full animate-progress-bar"></div>
            </div>
          </div>
        </div>

        <!-- Results section -->
        <div *ngIf="result" class="space-y-6 animate-slide-up">

          <!-- Risk score card -->
          <div class="card p-6">
            <h2 class="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-5">
              Audit Result
            </h2>
            <div class="flex items-center gap-8">

              <!-- Circular gauge -->
              <div class="relative shrink-0 flex items-center justify-center">
                <svg class="h-28 w-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8"
                          class="text-muted" />
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke-width="8"
                    [attr.stroke]="riskColor(result.risk_score)"
                    [attr.stroke-dasharray]="251.2"
                    [attr.stroke-dashoffset]="251.2 - (251.2 * result.risk_score / 100)"
                    stroke-linecap="round"
                    class="transition-all duration-700 ease-out"
                  />
                </svg>
                <div class="absolute flex flex-col items-center">
                  <span class="text-3xl font-bold tabular"
                        [style.color]="riskColor(result.risk_score)">
                    {{ result.risk_score }}
                  </span>
                  <span class="text-xs text-foreground/40">/100</span>
                </div>
              </div>

              <!-- Summary -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-3">
                  <span [ngClass]="riskBadgeClass(result.risk_score)" class="text-sm px-3 py-1">
                    {{ riskLabel(result.risk_score) }}
                  </span>
                </div>
                <p class="text-sm text-foreground/70 leading-relaxed">{{ result.risk_summary }}</p>
              </div>

            </div>
          </div>

          <!-- Anomalies list -->
          <div *ngIf="result.anomalies.length > 0" class="card">
            <div class="px-5 py-4 border-b border-border">
              <h2 class="text-sm font-semibold text-foreground">
                Detected Anomalies
                <span class="ml-2 text-foreground/40 font-normal">({{ result.anomalies.length }})</span>
              </h2>
            </div>
            <ul class="divide-y divide-border" role="list" aria-label="Anomaly flags">
              <li
                *ngFor="let a of result.anomalies; trackBy: trackByCode"
                class="px-5 py-4 flex items-start gap-4"
              >
                <!-- Severity pill -->
                <span
                  class="mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold"
                  [ngClass]="severityClass(a.severity)"
                >{{ a.severity }}</span>

                <!-- Detail -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-foreground font-mono">{{ a.code }}</p>
                  <p class="mt-1 text-sm text-foreground/60">{{ a.description }}</p>
                  <div *ngIf="a.affected_documents.length > 0" class="mt-2 flex flex-wrap gap-1.5">
                    <span
                      *ngFor="let doc of a.affected_documents"
                      class="rounded bg-muted border border-border px-2 py-0.5 text-xs font-mono text-foreground/50"
                    >{{ doc }}</span>
                  </div>
                </div>

                <!-- Amount delta -->
                <div *ngIf="a.delta_amount !== null" class="shrink-0 text-right">
                  <span class="text-sm font-semibold tabular text-destructive">
                    +{{ a.delta_amount | number:'1.2-2' }}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <!-- No anomalies -->
          <div *ngIf="result.anomalies.length === 0" class="card flex flex-col items-center gap-3 py-10 text-center">
            <svg class="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <p class="text-base font-medium text-foreground">No anomalies detected</p>
            <p class="text-sm text-foreground/50">This audit session passed all checks.</p>
          </div>

        </div>

        <!-- Error banner -->
        <div *ngIf="wsError" class="card p-5 border-destructive/30 bg-destructive/5 animate-slide-up" role="alert">
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-destructive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-destructive">Pipeline Error</p>
              <p class="text-sm text-foreground/50 mt-0.5">{{ wsError }}</p>
            </div>
          </div>
        </div>

      </ng-container>
    </div>
  `,
})
export class LiveAuditComponent implements OnInit, OnDestroy {
  sessionId = '';
  session: AuditSession | null = null;
  steps: StepState[] = [];
  result: { risk_score: number; risk_summary: string; anomalies: AnomalyFlag[] } | null = null;
  loadError = '';
  wsError = '';

  // Expose helpers
  riskColor = riskColor;
  riskLabel = riskLabel;
  riskBadgeClass = riskBadgeClass;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private ws: WebSocketService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadSession();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ws.disconnect(this.sessionId);
  }

  get isRunning(): boolean {
    return this.session?.status === 'RUNNING' || this.session?.status === 'PENDING';
  }

  // ── Load session & subscribe to WS ────────────────────────────────────────

  private loadSession(): void {
    this.api.getSession(this.sessionId).subscribe({
      next: (s) => {
        this.session = s;

        // If already completed, show result from DB
        if (s.status === 'COMPLETED' && s.risk_score !== null) {
          this.result = {
            risk_score:   s.risk_score,
            risk_summary: s.risk_summary ?? '',
            anomalies:    s.anomalies,
          };
        }

        this.cd.markForCheck();

        // Always subscribe to WS — handles both live and already-running sessions
        this.subscribeWebSocket();
      },
      error: (err: Error) => {
        this.loadError = err.message;
        this.cd.markForCheck();
      },
    });
  }

  private subscribeWebSocket(): void {
    this.ws.connect(this.sessionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          switch (event.type) {
            case 'PROGRESS':
              this.handleProgress(event as WsProgressEvent);
              break;
            case 'RESULT':
              this.handleResult(event as WsResultEvent);
              break;
            case 'ERROR':
              this.wsError = event.message;
              if (this.session) this.session.status = 'FAILED';
              break;
          }
          this.cd.markForCheck();
        },
      });
  }

  private handleProgress(event: WsProgressEvent): void {
    // Ensure we have slots for all steps
    while (this.steps.length < event.total_steps) {
      this.steps.push({ label: '…', detail: null, status: 'PENDING' });
    }
    this.steps[event.step - 1] = {
      label:     event.label,
      detail:    event.detail,
      status:    event.status,
      timestamp: event.timestamp,
    };
    if (this.session) this.session.status = event.status === 'DONE' ? 'RUNNING' : 'RUNNING';
  }

  private handleResult(event: WsResultEvent): void {
    this.result = {
      risk_score:   event.risk_score,
      risk_summary: event.risk_summary,
      anomalies:    event.anomalies,
    };
    if (this.session) {
      this.session.status = 'COMPLETED';
      this.session.risk_score = event.risk_score;
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  statusBadge(status: string): string {
    const map: Record<string, string> = {
      PENDING:   'badge-pending',
      RUNNING:   'badge-running',
      COMPLETED: 'badge-safe',
      FAILED:    'badge-critical',
    };
    return map[status] ?? 'badge-pending';
  }

  severityClass(severity: AnomalySeverity): string {
    const map: Record<string, string> = {
      LOW:      'bg-risk-low/10 text-risk-low',
      MEDIUM:   'bg-risk-medium/10 text-risk-medium',
      HIGH:     'bg-risk-high/10 text-risk-high',
      CRITICAL: 'bg-risk-critical/10 text-risk-critical',
    };
    return map[severity] ?? '';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }

  formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  trackByIndex(i: number): number { return i; }
  trackByCode(_: number, a: AnomalyFlag): string { return a.code; }
}
