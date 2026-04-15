import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ApiService, UploadPayload } from '../../core/services/api.service';
import {
  DocumentUpload,
  DocumentType,
  Tender,
  UploadN8nResultPayload,
  DOC_TYPE_LABELS,
  TENDER_DOCUMENT_TYPES,
} from '../../core/models/audit.models';

interface UploadItem {
  file: File;
  status: 'queued' | 'uploading' | 'done' | 'error';
  docType: DocumentType;
  tenderId: string;
  result?: DocumentUpload;
  error?: string;
  n8n?: {
    phase: 'polling' | 'ready' | 'timeout';
    result?: UploadN8nResultPayload;
  };
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-foreground">Upload Documents</h1>
        <p class="mt-1.5 text-sm text-foreground/60">
          Drag and drop or browse to upload financial documents. Select the document type and optionally link to a tender.
        </p>
      </div>

      <!-- Drop zone -->
      <div
        #dropZone
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
        [ngClass]="{'border-accent': isDragging, 'bg-accent/5': isDragging}"
        class="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border
               bg-muted/30 px-6 py-14 cursor-pointer transition-all duration-200
               hover:border-accent/60 hover:bg-accent/5"
        role="button"
        tabindex="0"
        aria-label="Upload financial documents"
        (keydown.enter)="fileInput.click()"
        (keydown.space)="fileInput.click()"
      >
        <input
          #fileInput
          type="file"
          class="sr-only"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.tiff,.tif,.xlsx,.csv"
          (change)="onFileChange($event)"
          aria-hidden="true"
        />
        <div class="flex flex-col items-center gap-4 text-center pointer-events-none">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary
                      border border-border group-hover:border-accent/50 transition-colors duration-200">
            <svg class="h-8 w-8 text-foreground/40 group-hover:text-accent transition-colors duration-200"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div>
            <p class="text-base font-medium text-foreground/80">
              <span class="text-accent">Click to browse</span> or drag files here
            </p>
            <p class="mt-1 text-xs text-foreground/40">PDF, JPEG, PNG, TIFF, XLSX, CSV — up to 20 MB each</p>
          </div>
        </div>
      </div>

      <!-- Queue -->
      <div *ngIf="queue.length > 0" class="mt-6 space-y-3 animate-slide-up">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-medium text-foreground/70">Files ({{ queue.length }})</h2>
          <button
            *ngIf="!isUploading"
            (click)="clearQueue()"
            class="btn-ghost text-xs py-1 px-2"
            aria-label="Clear file queue"
          >Clear all</button>
        </div>

        <!-- Tenders loading -->
        <p *ngIf="loadingTenders" class="text-xs text-foreground/40">Loading tenders…</p>

        <ul class="space-y-2" role="list" aria-label="Upload queue">
          <li
            *ngFor="let item of queue; let i = index; trackBy: trackByFile"
            class="card p-3 space-y-3"
          >
            <!-- Top row: icon + name + status + remove -->
            <div class="flex items-center gap-3">
              <!-- Icon -->
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary border border-border">
                <svg class="h-5 w-5" [class]="fileIconColor(item)" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>

              <!-- Name + size -->
              <div class="flex-1 min-w-0">
                <p class="truncate text-sm font-medium text-foreground">{{ item.file.name }}</p>
                <p class="text-xs text-foreground/40 tabular">{{ formatSize(item.file.size) }}</p>
              </div>

              <!-- Status -->
              <div class="shrink-0">
                <span *ngIf="item.status === 'queued'"    class="badge-pending">Queued</span>
                <span *ngIf="item.status === 'uploading'" class="badge-running">Uploading</span>
                <span *ngIf="item.status === 'done'"      class="badge-safe">Done</span>
                <span *ngIf="item.status === 'error'"
                      class="badge-critical" [title]="item.error">Error</span>
              </div>

              <!-- Remove -->
              <button
                *ngIf="item.status !== 'uploading'"
                (click)="removeItem(item); $event.stopPropagation()"
                class="btn-ghost p-1 text-foreground/40 hover:text-destructive"
                aria-label="Remove file"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Bottom row: doc type + tender (only when queued) -->
            <div *ngIf="item.status === 'queued' || item.status === 'error'"
                 class="grid gap-2 pl-[52px]"
                 [ngClass]="{'grid-cols-2': isTenderType(item.docType), 'grid-cols-1': !isTenderType(item.docType)}">

              <!-- Document type selector -->
              <div>
                <label class="block text-xs text-foreground/40 mb-1">Document type</label>
                <select
                  [(ngModel)]="item.docType"
                  (ngModelChange)="onTypeChange(item)"
                  class="input text-sm py-1.5"
                  [disabled]="isUploading"
                >
                  <option *ngFor="let opt of docTypeOptions" [value]="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>

              <!-- Tender selector (only for QUOTE / BID / MARKET_PLACE) -->
              <div *ngIf="isTenderType(item.docType)">
                <label class="block text-xs text-foreground/40 mb-1">Related tender</label>
                <select
                  [(ngModel)]="item.tenderId"
                  class="input text-sm py-1.5"
                  [disabled]="isUploading || loadingTenders"
                >
                  <option value="">— None —</option>
                  <option *ngFor="let t of tenders" [value]="t.id">
                    {{ t.reference }} · {{ t.name }}
                    <ng-container *ngIf="t.status === 'AWARDED'"> ✓ {{ t.winner?.company }}</ng-container>
                  </option>
                </select>
              </div>

            </div>

            <!-- Done: show type badge -->
            <div *ngIf="item.status === 'done'" class="pl-[52px]">
              <span class="text-xs text-foreground/50">
                {{ docTypeLabel(item.docType) }}
                <ng-container *ngIf="item.tenderId">
                  · <span class="text-accent/70">{{ tenderName(item.tenderId) }}</span>
                </ng-container>
              </span>
            </div>

            <!-- n8n workflow yhs1QhteOspEbuDN — result card (polls backend after upload) -->
            <div *ngIf="item.status === 'done' && item.n8n"
                 class="pl-[52px] mt-3 rounded-xl border border-border bg-muted/30 p-4 space-y-3">
              <p class="text-xs font-medium text-foreground/60">AI workflow (n8n)</p>
              <div *ngIf="item.n8n.phase === 'polling'" class="flex items-center gap-2 text-sm text-foreground/50">
                <span class="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin inline-block"></span>
                Waiting for callback to your API…
              </div>
              <ng-container *ngIf="item.n8n.phase === 'ready' && item.n8n.result">
                <div class="flex flex-wrap items-baseline gap-2">
                  <span class="text-2xl font-semibold text-foreground tabular-nums">{{ item.n8n.result.risk_score }}</span>
                  <span class="text-sm text-foreground/45">/ 100 risk</span>
                </div>
                <p class="text-sm text-foreground/85 leading-relaxed">{{ item.n8n.result.risk_summary }}</p>
                <ul *ngIf="item.n8n.result.anomalies?.length" class="text-xs space-y-1.5 text-foreground/70 list-disc pl-4">
                  <li *ngFor="let a of item.n8n.result.anomalies">{{ anomalySummary(a) }}</li>
                </ul>
              </ng-container>
              <p *ngIf="item.n8n.phase === 'timeout'" class="text-xs text-foreground/50 leading-relaxed">
                No result received in time. Ensure n8n workflow ends with an HTTP Request to
                <code class="text-[10px] bg-muted px-1 rounded">{{ callbackHint }}</code>
                including header <code class="text-[10px] bg-muted px-1 rounded">X-N8n-Secret</code> and JSON body with
                <code class="text-[10px] bg-muted px-1 rounded">document_id</code> (same as upload response <code class="text-[10px] bg-muted px-1 rounded">id</code>).
              </p>
            </div>
          </li>
        </ul>

        <!-- Upload actions -->
        <div class="flex items-center justify-between pt-2">
          <div>
            <p *ngIf="uploadError"   class="text-sm text-destructive" role="alert">{{ uploadError }}</p>
            <p *ngIf="uploadSuccess" class="text-sm text-accent">
              {{ doneCount }} file{{ doneCount !== 1 ? 's' : '' }} uploaded successfully!
            </p>
          </div>
          <div class="flex gap-3 ml-auto">
            <a routerLink="/new-session" *ngIf="uploadSuccess" class="btn-secondary text-sm">
              Create Audit Session →
            </a>
            <button
              [disabled]="isUploading || queuedCount === 0"
              (click)="uploadAll()"
              class="btn-primary text-sm"
              [attr.aria-busy]="isUploading"
            >
              <svg *ngIf="isUploading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isUploading ? 'Uploading…' : 'Upload ' + queuedCount + ' File' + (queuedCount !== 1 ? 's' : '') }}
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
})
export class UploadComponent implements OnInit {
  @ViewChild('dropZone') dropZoneRef!: ElementRef<HTMLDivElement>;

  /** Shown in timeout card — backend path; replace host with your deployed API. */
  readonly callbackHint = '/api/webhook/n8n-result-upload';

  queue: UploadItem[] = [];
  tenders: Tender[] = [];
  isDragging = false;
  isUploading = false;
  loadingTenders = false;
  uploadError = '';
  uploadSuccess = false;

  readonly docTypeOptions = Object.entries(DOC_TYPE_LABELS).map(([value, label]) => ({
    value: value as DocumentType,
    label,
  }));

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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

  // ── Drag & Drop ────────────────────────────────────────────────────────────

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.addFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(Array.from(input.files ?? []));
    input.value = '';
  }

  // ── Queue management ───────────────────────────────────────────────────────

  private addFiles(files: File[]): void {
    const newItems: UploadItem[] = files.map(f => ({
      file: f,
      status: 'queued',
      docType: inferDocType(f.name),
      tenderId: '',
    }));
    this.queue = [...this.queue, ...newItems];
    this.uploadSuccess = false;
    this.uploadError = '';
    this.cd.markForCheck();
  }

  removeItem(item: UploadItem): void {
    this.queue = this.queue.filter(i => i !== item);
  }

  clearQueue(): void {
    this.queue = [];
    this.uploadSuccess = false;
    this.uploadError = '';
  }

  onTypeChange(item: UploadItem): void {
    // Clear tender when switching to a non-tender type
    if (!TENDER_DOCUMENT_TYPES.includes(item.docType)) {
      item.tenderId = '';
    }
  }

  // ── Upload ─────────────────────────────────────────────────────────────────

  uploadAll(): void {
    const toUpload = this.queue.filter(i => i.status === 'queued');
    if (!toUpload.length) return;

    this.isUploading = true;
    this.uploadError = '';
    this.uploadSuccess = false;

    toUpload.forEach(i => (i.status = 'uploading'));
    this.cd.markForCheck();

    const payloads: UploadPayload[] = toUpload.map(i => ({
      file: i.file,
      docType: i.docType,
      tenderId: i.tenderId || undefined,
    }));

    this.api.uploadDocuments(payloads).subscribe({
      next: (results) => {
        results.forEach((res, idx) => {
          toUpload[idx].status = 'done';
          toUpload[idx].result = res;
          toUpload[idx].n8n = { phase: 'polling' };
          this.api.pollUploadN8nResult(String(res.id)).subscribe({
            next: (st) => {
              if (st.status === 'ready' && st.result) {
                toUpload[idx].n8n = { phase: 'ready', result: st.result };
              } else {
                toUpload[idx].n8n = { phase: 'timeout' };
              }
              this.cd.markForCheck();
            },
            error: () => {
              toUpload[idx].n8n = { phase: 'timeout' };
              this.cd.markForCheck();
            },
          });
        });
        this.isUploading = false;
        this.uploadSuccess = true;
        this.cd.markForCheck();
      },
      error: (err: Error) => {
        toUpload.forEach(i => {
          if (i.status === 'uploading') {
            i.status = 'error';
            i.error = err.message;
          }
        });
        this.isUploading = false;
        this.uploadError = err.message;
        this.cd.markForCheck();
      },
    });
  }

  // ── Computed getters ───────────────────────────────────────────────────────

  get queuedCount(): number {
    return this.queue.filter(i => i.status === 'queued').length;
  }

  get doneCount(): number {
    return this.queue.filter(i => i.status === 'done').length;
  }

  // ── Utilities ──────────────────────────────────────────────────────────────

  isTenderType(t: DocumentType): boolean {
    return TENDER_DOCUMENT_TYPES.includes(t);
  }

  docTypeLabel(t: DocumentType): string {
    return DOC_TYPE_LABELS[t] ?? t;
  }

  tenderName(id: string): string {
    const t = this.tenders.find(x => x.id === id);
    return t ? `${t.reference} · ${t.name}` : id;
  }

  anomalySummary(a: Record<string, unknown>): string {
    const code = typeof a['code'] === 'string' ? a['code'] : 'FLAG';
    const desc =
      typeof a['description'] === 'string' ? a['description'] : JSON.stringify(a);
    return `${code}: ${desc}`;
  }

  formatSize(bytes: number): string {
    if (bytes < 1024)      return `${bytes} B`;
    if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
  }

  fileIconColor(item: UploadItem): string {
    switch (item.status) {
      case 'done':      return 'text-accent';
      case 'error':     return 'text-destructive';
      case 'uploading': return 'text-accent animate-pulse';
      default:          return 'text-foreground/40';
    }
  }

  trackByFile(_: number, item: UploadItem): string {
    return item.file.name + item.file.size;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function inferDocType(filename: string): DocumentType {
  const l = filename.toLowerCase();
  if (l.includes('invoice') || l.includes('facture') || l.includes('inv_')) return 'INVOICE';
  if (l.includes('bank') || l.includes('statement') || l.includes('releve') || l.includes('rib')) return 'BANK_STATEMENT';
  if (l.includes('quote') || l.includes('devis') || l.includes('quotation') || l.includes('offer')) return 'QUOTE';
  if (l.includes('pricebook') || l.includes('price_book') || l.includes('catalogue') || l.includes('tarif')) return 'PRICE_BOOK';
  if (l.includes('bid') || l.includes('soumission') || l.includes('appel')) return 'BID';
  if (l.includes('market') || l.includes('marketplace') || l.includes('comparatif')) return 'MARKET_PLACE';
  return 'OTHER';
}
