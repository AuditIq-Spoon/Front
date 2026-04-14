import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import {
  AuditSessionListItem,
  riskBadgeClass,
  riskLabel,
  riskColor,
} from '../../core/models/audit.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header row -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-semibold text-foreground">Audit Dashboard</h1>
          <p class="mt-1 text-sm text-foreground/60">Overview of all audit sessions and their risk scores.</p>
        </div>
        <a routerLink="/new-session" class="btn-primary text-sm">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Audit
        </a>
      </div>

      <!-- Loading skeleton -->
      <div *ngIf="loading" class="space-y-3" aria-busy="true" aria-label="Loading sessions">
        <div *ngFor="let _ of [1,2,3,4]" class="card h-20 animate-pulse bg-muted/50"></div>
      </div>

      <!-- Error state -->
      <div *ngIf="!loading && error"
           class="card flex flex-col items-center gap-4 py-16 text-center"
           role="alert">
        <svg class="h-10 w-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <div>
          <p class="text-base font-medium text-foreground">Failed to load sessions</p>
          <p class="mt-1 text-sm text-foreground/50">{{ error }}</p>
        </div>
        <button (click)="load()" class="btn-secondary text-sm">Retry</button>
      </div>

      <!-- Empty state -->
      <div *ngIf="!loading && !error && sessions.length === 0"
           class="card flex flex-col items-center gap-4 py-20 text-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted border border-border">
          <svg class="h-8 w-8 text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        </div>
        <div>
          <p class="text-base font-medium text-foreground">No audit sessions yet</p>
          <p class="mt-1 text-sm text-foreground/50">Upload documents and create your first audit session.</p>
        </div>
        <div class="flex gap-3">
          <a routerLink="/upload" class="btn-secondary text-sm">Upload Documents</a>
          <a routerLink="/new-session" class="btn-primary text-sm">New Audit</a>
        </div>
      </div>

      <!-- Sessions table -->
      <div *ngIf="!loading && !error && sessions.length > 0"
           class="card overflow-hidden animate-slide-up">
        <table class="w-full text-sm" role="grid" aria-label="Audit sessions">
          <thead>
            <tr class="border-b border-border bg-primary/50">
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Session</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider hidden sm:table-cell">Parameters</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">Risk Score</th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider hidden md:table-cell">Created</th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr
              *ngFor="let s of sessions; trackBy: trackById"
              class="hover:bg-muted/40 transition-colors duration-100 cursor-pointer group"
              [routerLink]="['/audit', s.id]"
              role="row"
            >
              <!-- Session ID -->
              <td class="px-4 py-3">
                <span class="font-mono text-xs text-foreground/40">{{ s.id | slice:0:8 }}…</span>
              </td>

              <!-- Type badge -->
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium"
                  [ngClass]="{
                    'bg-blue-500/10': s.audit_type === 'INOUT',
                    'text-blue-400': s.audit_type === 'INOUT',
                    'bg-purple-500/10': s.audit_type === 'TENDER',
                    'text-purple-400': s.audit_type === 'TENDER'
                  }"
                >
                  {{ s.audit_type }}
                </span>
              </td>

              <!-- Params summary -->
              <td class="px-4 py-3 text-foreground/60 hidden sm:table-cell">
                <ng-container *ngIf="s.audit_type === 'INOUT'">
                  {{ s.params['start_date'] }} → {{ s.params['end_date'] }}
                </ng-container>
                <ng-container *ngIf="s.audit_type === 'TENDER'">
                  {{ s.params['project_name'] }}
                </ng-container>
              </td>

              <!-- Status -->
              <td class="px-4 py-3">
                <span [ngClass]="statusBadge(s.status)">
                  {{ s.status }}
                </span>
              </td>

              <!-- Risk score gauge -->
              <td class="px-4 py-3 text-right tabular">
                <div class="flex items-center justify-end gap-2">
                  <ng-container *ngIf="s.risk_score !== null; else noScore">
                    <!-- Mini gauge -->
                    <div class="relative h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        class="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                        [style.width.%]="s.risk_score"
                        [style.background-color]="riskColor(s.risk_score)"
                      ></div>
                    </div>
                    <span
                      class="text-sm font-semibold tabular"
                      [style.color]="riskColor(s.risk_score)"
                    >{{ s.risk_score }}</span>
                  </ng-container>
                  <ng-template #noScore>
                    <span class="text-sm text-foreground/30">—</span>
                  </ng-template>
                </div>
              </td>

              <!-- Date -->
              <td class="px-4 py-3 text-right text-xs text-foreground/40 hidden md:table-cell tabular">
                {{ formatDate(s.created_at) }}
              </td>

              <!-- Arrow -->
              <td class="px-4 py-3 text-right">
                <svg class="ml-auto h-4 w-4 text-foreground/20 group-hover:text-accent transition-colors duration-150"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  `,
})
export class DashboardComponent implements OnInit {
  sessions: AuditSessionListItem[] = [];
  loading = true;
  error = '';

  // Expose helpers to template
  riskBadgeClass = riskBadgeClass;
  riskLabel = riskLabel;
  riskColor = riskColor;

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.cd.markForCheck();

    this.api.listSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
        this.cd.markForCheck();
      },
    });
  }

  statusBadge(status: string): string {
    const map: Record<string, string> = {
      PENDING:   'badge-pending',
      RUNNING:   'badge-running',
      COMPLETED: 'badge-safe',
      FAILED:    'badge-critical',
    };
    return map[status] ?? 'badge-pending';
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  trackById(_: number, s: AuditSessionListItem): string {
    return s.id;
  }
}
