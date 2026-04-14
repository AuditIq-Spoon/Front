import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { DocumentListItem, DOC_TYPE_LABELS, DocumentType } from '../../core/models/audit.models';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-foreground">Document Library</h1>
        <p class="mt-1 text-sm text-foreground/60">
          Every uploaded file appears below. Use the date window to see documents that would be included in an
          <span class="font-medium text-foreground/80">INOUT</span> audit (same rule as session creation: business
          <code class="text-xs font-mono text-accent/90">transaction_date</code> between start and end).
        </p>
      </div>

      <!-- Date window -->
      <div class="card p-5 mb-8">
        <h2 class="text-sm font-semibold text-foreground mb-4">INOUT audit date window</h2>
        <div class="flex flex-wrap items-end gap-4">
          <div>
            <label class="label text-xs" for="win_start">Start date</label>
            <input id="win_start" type="date" [(ngModel)]="winStart" class="input text-sm" />
          </div>
          <div>
            <label class="label text-xs" for="win_end">End date</label>
            <input id="win_end" type="date" [(ngModel)]="winEnd" class="input text-sm" />
          </div>
          <button type="button" (click)="reload()" class="btn-primary text-sm" [disabled]="loading">
            Apply window
          </button>
        </div>
        <p *ngIf="windowError" class="mt-3 text-sm text-destructive" role="alert">{{ windowError }}</p>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="space-y-3" aria-busy="true">
        <div *ngFor="let _ of [1,2,3,4,5]" class="card h-12 animate-pulse bg-muted/50"></div>
      </div>

      <ng-container *ngIf="!loading">

        <!-- All documents -->
        <div class="mb-10">
          <h2 class="text-lg font-semibold text-foreground mb-3">
            All uploads
            <span class="ml-2 text-sm font-normal text-foreground/40">({{ allDocs.length }})</span>
          </h2>
          <div *ngIf="allDocs.length === 0" class="card py-12 text-center text-sm text-foreground/50">
            No documents yet. <a routerLink="/upload" class="text-accent hover:underline">Upload files</a>
          </div>
          <div *ngIf="allDocs.length > 0" class="card overflow-hidden">
            <table class="w-full text-sm" role="grid">
              <thead>
                <tr class="border-b border-border bg-primary/50">
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase">File</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden sm:table-cell">Type</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden md:table-cell">Transaction</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden lg:table-cell">Tender</th>
                  <th class="px-4 py-2 text-right text-xs font-medium text-foreground/50 uppercase">Uploaded</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let d of allDocs; trackBy: trackById" class="hover:bg-muted/30">
                  <td class="px-4 py-2.5">
                    <p class="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">{{ d.filename }}</p>
                    <p class="text-xs text-foreground/40 sm:hidden">{{ docLabel(d.document_type) }}</p>
                  </td>
                  <td class="px-4 py-2.5 text-foreground/70 hidden sm:table-cell">{{ docLabel(d.document_type) }}</td>
                  <td class="px-4 py-2.5 font-mono text-xs text-foreground/60 hidden md:table-cell">
                    {{ d.transaction_date || '—' }}
                  </td>
                  <td class="px-4 py-2.5 text-xs text-foreground/50 hidden lg:table-cell">
                    {{ d.tender_id || '—' }}
                  </td>
                  <td class="px-4 py-2.5 text-right text-xs text-foreground/40 tabular whitespace-nowrap">
                    {{ formatDt(d.uploaded_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- In-window -->
        <div>
          <h2 class="text-lg font-semibold text-foreground mb-3">
            In audit window
            <span class="ml-2 text-sm font-normal text-foreground/40">
              ({{ winStart }} → {{ winEnd }}, {{ windowDocs.length }})
            </span>
          </h2>
          <p class="text-xs text-foreground/40 mb-3">
            Bank statements & invoices use this date filter during an INOUT session; quotes and price books are unbounded on dates in the pipeline.
          </p>
          <div *ngIf="windowDocs.length === 0" class="card py-10 text-center text-sm text-foreground/50">
            No documents with a transaction date in this range.
          </div>
          <div *ngIf="windowDocs.length > 0" class="card overflow-hidden border-accent/20">
            <table class="w-full text-sm" role="grid">
              <thead>
                <tr class="border-b border-border bg-accent/5">
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase">File</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden sm:table-cell">Type</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase">Transaction</th>
                  <th class="px-4 py-2 text-right text-xs font-medium text-foreground/50 uppercase">Uploaded</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let d of windowDocs; trackBy: trackById" class="hover:bg-muted/30">
                  <td class="px-4 py-2.5 font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">{{ d.filename }}</td>
                  <td class="px-4 py-2.5 text-foreground/70 hidden sm:table-cell">{{ docLabel(d.document_type) }}</td>
                  <td class="px-4 py-2.5 font-mono text-xs text-accent/90">{{ d.transaction_date }}</td>
                  <td class="px-4 py-2.5 text-right text-xs text-foreground/40 tabular whitespace-nowrap">
                    {{ formatDt(d.uploaded_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </ng-container>
    </div>
  `,
})
export class DocumentsComponent implements OnInit {
  allDocs: DocumentListItem[] = [];
  windowDocs: DocumentListItem[] = [];
  winStart = '';
  winEnd = '';
  loading = true;
  windowError = '';

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    this.winEnd = end.toISOString().slice(0, 10);
    this.winStart = start.toISOString().slice(0, 10);
    this.reload();
  }

  reload(): void {
    this.windowError = '';
    if (!this.winStart || !this.winEnd) {
      this.windowError = 'Please choose both start and end dates.';
      return;
    }
    if (this.winStart > this.winEnd) {
      this.windowError = 'Start date must be on or before end date.';
      return;
    }

    this.loading = true;
    this.cd.markForCheck();

    forkJoin({
      all: this.api.listDocuments(),
      window: this.api.listDocuments(this.winStart, this.winEnd),
    }).subscribe({
      next: ({ all, window }) => {
        this.allDocs = all;
        this.windowDocs = window;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err: Error) => {
        this.windowError = err.message;
        this.loading = false;
        this.cd.markForCheck();
      },
    });
  }

  docLabel(t: DocumentType): string {
    return DOC_TYPE_LABELS[t] ?? t;
  }

  formatDt(iso: string): string {
    try {
      return new Date(iso).toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return iso;
    }
  }

  trackById(_: number, d: DocumentListItem): string {
    return d.id;
  }
}
