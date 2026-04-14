import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { AuditType, Tender } from '../../core/models/audit.models';

@Component({
  selector: 'app-session-creator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-foreground">New Audit Session</h1>
        <p class="mt-1.5 text-sm text-foreground/60">
          Configure an audit session. The AI pipeline will automatically select and analyse the matching documents.
        </p>
      </div>

      <!-- Audit type selector -->
      <div class="mb-6">
        <label class="label">Audit Type <span class="text-destructive" aria-hidden="true">*</span></label>
        <div class="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Audit type">

          <!-- INOUT button -->
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="selectedType === 'INOUT'"
            (click)="selectType('INOUT')"
            [ngClass]="{
              'border-accent': selectedType === 'INOUT',
              'bg-accent/5': selectedType === 'INOUT',
              'shadow-glow-accent': selectedType === 'INOUT'
            }"
            class="card flex flex-col gap-2 p-4 cursor-pointer text-left transition-all duration-150
                   hover:border-accent/50 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md"
                   [class.bg-accent]="selectedType === 'INOUT'"
                   [class.bg-primary]="selectedType !== 'INOUT'">
                <svg class="h-4 w-4"
                     [ngClass]="{
                       'text-background': selectedType === 'INOUT',
                       'text-foreground/50': selectedType !== 'INOUT'
                     }"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-foreground">INOUT Transaction</span>
            </div>
            <p class="text-xs text-foreground/50 leading-relaxed">
              Analyse bank statements, invoices, quotes, and price books over a date range.
            </p>
          </button>

          <!-- TENDER button -->
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="selectedType === 'TENDER'"
            (click)="selectType('TENDER')"
            [ngClass]="{
              'border-accent': selectedType === 'TENDER',
              'bg-accent/5': selectedType === 'TENDER',
              'shadow-glow-accent': selectedType === 'TENDER'
            }"
            class="card flex flex-col gap-2 p-4 cursor-pointer text-left transition-all duration-150
                   hover:border-accent/50 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md"
                   [class.bg-accent]="selectedType === 'TENDER'"
                   [class.bg-primary]="selectedType !== 'TENDER'">
                <svg class="h-4 w-4"
                     [ngClass]="{
                       'text-background': selectedType === 'TENDER',
                       'text-foreground/50': selectedType !== 'TENDER'
                     }"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-foreground">Tender Audit</span>
            </div>
            <p class="text-xs text-foreground/50 leading-relaxed">
              Evaluate bids, market comparisons, and supplier selection for a procurement project.
            </p>
          </button>

        </div>
      </div>

      <!-- Dynamic form -->
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="space-y-5 animate-slide-up">

        <!-- INOUT params -->
        <ng-container *ngIf="selectedType === 'INOUT'">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label" for="start_date">
                Start Date <span class="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="start_date"
                type="date"
                formControlName="start_date"
                class="input"
                [class.border-destructive]="isInvalid('start_date')"
                [attr.aria-invalid]="isInvalid('start_date')"
                aria-describedby="start_date_err"
              />
              <p *ngIf="isInvalid('start_date')" id="start_date_err"
                 class="mt-1 text-xs text-destructive" role="alert">
                Start date is required.
              </p>
            </div>
            <div>
              <label class="label" for="end_date">
                End Date <span class="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="end_date"
                type="date"
                formControlName="end_date"
                class="input"
                [class.border-destructive]="isInvalid('end_date') || dateRangeError"
                [attr.aria-invalid]="isInvalid('end_date') || dateRangeError"
                aria-describedby="end_date_err"
              />
              <p *ngIf="isInvalid('end_date')" id="end_date_err"
                 class="mt-1 text-xs text-destructive" role="alert">
                End date is required.
              </p>
              <p *ngIf="dateRangeError"
                 class="mt-1 text-xs text-destructive" role="alert">
                End date must be after start date.
              </p>
            </div>
          </div>
        </ng-container>

        <!-- TENDER params -->
        <ng-container *ngIf="selectedType === 'TENDER'">

          <!-- Loading tenders -->
          <div *ngIf="loadingTenders" class="flex items-center gap-2 text-sm text-foreground/50">
            <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading tenders…
          </div>

          <!-- Tender selector -->
          <div *ngIf="!loadingTenders">
            <label class="label" for="tender_select">
              Select Tender (Appel d'Offre)
              <span class="text-destructive" aria-hidden="true">*</span>
            </label>

            <!-- Tender cards -->
            <div class="space-y-2 max-h-72 overflow-y-auto pr-1" role="listbox" aria-label="Tender list">
              <div
                *ngFor="let t of tenders"
                (click)="selectTender(t)"
                [class.border-accent]="selectedTenderId === t.id"
                [ngClass]="{'bg-accent/5': selectedTenderId === t.id, 'opacity-50 cursor-not-allowed': t.status === 'CANCELLED'}"
                class="card p-3 cursor-pointer transition-all duration-100 hover:border-accent/50 hover:bg-muted/40"
                role="option"
                [attr.aria-selected]="selectedTenderId === t.id"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-mono text-foreground/40">{{ t.reference }}</span>
                      <span [ngClass]="tenderStatusClass(t.status)"
                            class="rounded px-1.5 py-0.5 text-xs font-medium">
                        {{ t.status }}
                      </span>
                    </div>
                    <p class="mt-0.5 text-sm font-semibold text-foreground leading-snug">{{ t.name }}</p>
                    <p class="mt-0.5 text-xs text-foreground/50 line-clamp-2">{{ t.description }}</p>
                  </div>
                  <div class="shrink-0 text-right">
                    <p class="text-sm font-semibold tabular text-foreground">
                      {{ t.budget | number:'1.0-0' }} {{ t.currency }}
                    </p>
                    <p *ngIf="t.deadline" class="text-xs text-foreground/40">
                      Due {{ t.deadline }}
                    </p>
                  </div>
                </div>

                <!-- Winner row -->
                <div *ngIf="t.winner" class="mt-2 flex items-center gap-2 pt-2 border-t border-border">
                  <svg class="h-3.5 w-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                  <span class="text-xs text-foreground/60">
                    Winner: <span class="font-medium text-foreground">{{ t.winner.company }}</span>
                    — {{ t.winner.amount | number:'1.0-0' }} {{ t.currency }}
                  </span>
                </div>
              </div>
            </div>

            <p *ngIf="!selectedTenderId && form.get('project_name')?.touched"
               class="mt-1.5 text-xs text-destructive" role="alert">
              Please select a tender.
            </p>
          </div>

          <!-- No tenders notice -->
          <div *ngIf="!loadingTenders && tenders.length === 0"
               class="card flex flex-col items-center gap-3 py-8 text-center">
            <p class="text-sm text-foreground/50">No tenders found.</p>
            <a routerLink="/upload" class="btn-secondary text-sm">Upload Tender Documents</a>
          </div>

        </ng-container>

        <!-- Errors / Submit -->
        <div class="pt-2">
          <p *ngIf="submitError" class="mb-3 text-sm text-destructive" role="alert">
            {{ submitError }}
          </p>
          <button
            type="submit"
            class="btn-primary w-full"
            [disabled]="isSubmitting"
            [attr.aria-busy]="isSubmitting"
          >
            <svg *ngIf="isSubmitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Creating Session…' : 'Start Audit Session' }}
          </button>
        </div>

      </form>
    </div>
  `,
})
export class SessionCreatorComponent implements OnInit {
  selectedType: AuditType = 'INOUT';
  selectedTenderId = '';
  tenders: Tender[] = [];
  loadingTenders = false;

  form: FormGroup;
  isSubmitting = false;
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      start_date:   ['', Validators.required],
      end_date:     ['', Validators.required],
      project_name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.loadTenders();
  }

  // ── Tenders ────────────────────────────────────────────────────────────────

  private loadTenders(): void {
    this.loadingTenders = true;
    this.api.listTenders().subscribe({
      next: (tenders) => {
        this.tenders = tenders;
        this.loadingTenders = false;
        this.cd.markForCheck();
      },
      error: () => {
        this.loadingTenders = false;
        this.cd.markForCheck();
      },
    });
  }

  selectTender(t: Tender): void {
    if (t.status === 'CANCELLED') return;
    this.selectedTenderId = t.id;
    this.form.get('project_name')?.setValue(t.name);
    this.form.get('project_name')?.markAsTouched();
  }

  tenderStatusClass(status: string): string {
    const map: Record<string, string> = {
      OPEN:      'bg-accent/10 text-accent',
      AWARDED:   'bg-purple-500/10 text-purple-400',
      CANCELLED: 'bg-muted text-foreground/30',
    };
    return map[status] ?? '';
  }

  // ── Type selection ─────────────────────────────────────────────────────────

  selectType(type: AuditType): void {
    this.selectedType = type;
    this.form.markAsPristine();
    this.submitError = '';
  }

  // ── Validation helpers ─────────────────────────────────────────────────────

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  get dateRangeError(): boolean {
    const start = this.form.get('start_date')?.value;
    const end   = this.form.get('end_date')?.value;
    return !!(start && end && end <= start);
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  submit(): void {
    if (this.selectedType === 'INOUT') {
      this.form.get('start_date')?.markAsTouched();
      this.form.get('end_date')?.markAsTouched();
      if (
        this.form.get('start_date')?.invalid ||
        this.form.get('end_date')?.invalid ||
        this.dateRangeError
      ) return;
    } else {
      this.form.get('project_name')?.markAsTouched();
      if (!this.selectedTenderId) return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const params =
      this.selectedType === 'INOUT'
        ? {
            audit_type: 'INOUT' as const,
            start_date: this.form.value.start_date,
            end_date:   this.form.value.end_date,
          }
        : {
            audit_type:   'TENDER' as const,
            tender_id:    this.selectedTenderId,
            project_name: this.form.value.project_name,
          };

    this.api.createSession({ params }).subscribe({
      next: (session) => {
        this.isSubmitting = false;
        this.cd.markForCheck();
        this.router.navigate(['/audit', session.id]);
      },
      error: (err: Error) => {
        this.isSubmitting = false;
        this.submitError = err.message;
        this.cd.markForCheck();
      },
    });
  }
}
