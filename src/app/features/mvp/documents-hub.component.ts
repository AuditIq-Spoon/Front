import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MOCK_APPELS_OFFRES, MOCK_OFFRES } from '../../core/data/mock-procurement.data';
import { DocumentIngestType } from '../../core/models/mvp.models';
import { DocumentUploadService, DocumentUploadState } from '../../core/services/document-upload.service';

@Component({
  selector: 'app-documents-hub',
  imports: [FormsModule, RouterLink, NgIf, NgFor, CurrencyPipe, DatePipe],
  templateUrl: './documents-hub.component.html',
  styleUrl: './documents-hub.component.scss',
})
export class DocumentsHubComponent {
  private readonly uploadSvc = inject(DocumentUploadService);
  private readonly destroyRef = inject(DestroyRef);

  readonly appels = MOCK_APPELS_OFFRES;
  readonly offres = MOCK_OFFRES;

  type: DocumentIngestType = 'invoice';
  parentTenderId = '';
  uploadState: DocumentUploadState | null = null;
  uploading = false;
  /** Visual feedback when dragging files over the drop card */
  dragActive = false;

  setType(t: DocumentIngestType): void {
    this.type = t;
    if (t !== 'quote') {
      this.parentTenderId = '';
    }
  }

  onFileInputChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    this.processFile(file);
  }

  onDragOver(ev: DragEvent): void {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.uploading && ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'copy';
    }
  }

  onDragEnter(ev: DragEvent): void {
    ev.preventDefault();
    if (!this.uploading) {
      this.dragActive = true;
    }
  }

  onDragLeave(ev: DragEvent): void {
    ev.preventDefault();
    const related = ev.relatedTarget as Node | null;
    const current = ev.currentTarget as HTMLElement;
    if (related && current.contains(related)) {
      return;
    }
    this.dragActive = false;
  }

  onDrop(ev: DragEvent): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragActive = false;
    if (this.uploading) {
      return;
    }
    const file = ev.dataTransfer?.files?.[0];
    this.processFile(file);
  }

  private processFile(file: File | undefined): void {
    if (!file) {
      return;
    }
    if (this.type === 'quote' && !this.parentTenderId.trim()) {
      this.uploadState = {
        percent: 100,
        done: true,
        error: 'For a quote, select the parent tender before uploading.',
      };
      return;
    }
    this.uploading = true;
    this.uploadState = { percent: 0, done: false };
    this.uploadSvc
      .upload(file, this.type, this.type === 'quote' ? this.parentTenderId : undefined)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((s) => {
        this.uploadState = s;
        if (s.done) {
          this.uploading = false;
        }
      });
  }
}
