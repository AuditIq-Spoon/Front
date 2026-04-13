import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { UPLOAD_TAG_OPTIONS } from '../../core/config/upload-tags.config';
import { PIPELINE_STEPS } from '../../core/data/pipeline-steps';
import { UploadDocumentTag } from '../../core/models/view-models';
import { IngestionChannel } from '../../core/config/ingestion-channels.config';
import { IngestionService, UploadProgress } from '../../core/services/ingestion.service';

type FileJob = {
  file: File;
  tag: UploadDocumentTag;
  progress?: UploadProgress;
};

@Component({
  selector: 'app-upload-hub',
  imports: [FormsModule],
  templateUrl: './upload-hub.component.html',
  styleUrl: './upload-hub.component.scss',
})
export class UploadHubComponent {
  private readonly ingestion = inject(IngestionService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pipeline = PIPELINE_STEPS;
  readonly tagOptions = UPLOAD_TAG_OPTIONS;

  selectedTag: UploadDocumentTag = 'facture';
  dossierId = '';
  autoClassify = false;
  readonly queue = signal<FileJob[]>([]);

  private readonly states = signal<Record<string, { dragging: boolean }>>({});

  isDragging(): boolean {
    return this.states()['main']?.dragging ?? false;
  }

  selectedChannel(): IngestionChannel | undefined {
    const opt = this.tagOptions.find((t) => t.id === this.selectedTag);
    return opt ? this.ingestion.channel(opt.channelId) : undefined;
  }

  onDragEnter(ev: DragEvent): void {
    ev.preventDefault();
    this.patchDrag(true);
  }

  onDragOver(ev: DragEvent): void {
    ev.preventDefault();
    this.patchDrag(true);
  }

  onDragLeave(ev: DragEvent): void {
    ev.preventDefault();
    const related = ev.relatedTarget as Node | null;
    if (related && (ev.currentTarget as HTMLElement).contains(related)) {
      return;
    }
    this.patchDrag(false);
  }

  onDrop(ev: DragEvent): void {
    ev.preventDefault();
    this.patchDrag(false);
    const files = ev.dataTransfer?.files;
    if (files?.length) {
      this.addFiles(Array.from(files));
    }
  }

  onFileInput(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    if (input.files?.length) {
      this.addFiles(Array.from(input.files));
    }
    input.value = '';
  }

  removeJob(job: FileJob): void {
    this.queue.update((q) => q.filter((j) => j !== job));
  }

  private addFiles(files: File[]): void {
    const jobs: FileJob[] = files.map((file) => ({
      file,
      tag: this.autoClassify ? this.guessTag(file) : this.selectedTag,
    }));
    this.queue.update((q) => [...q, ...jobs]);
    for (const job of jobs) {
      this.runUpload(job);
    }
  }

  private guessTag(file: File): UploadDocumentTag {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'csv') return 'releve';
    if (ext === 'pdf') return 'facture';
    if (ext === 'xlsx' || ext === 'xls') return 'devis';
    return this.selectedTag;
  }

  private runUpload(job: FileJob): void {
    const opt = this.tagOptions.find((t) => t.id === job.tag);
    const channel = opt ? this.ingestion.channel(opt.channelId) : undefined;
    if (!channel) {
      this.patchJob(job, {
        progress: {
          channelId: '',
          fileName: job.file.name,
          percent: 100,
          done: true,
          error: 'Unknown channel.',
        },
      });
      return;
    }
    if (!this.accepts(channel, job.file)) {
      this.patchJob(job, {
        progress: {
          channelId: channel.id,
          fileName: job.file.name,
          percent: 100,
          done: true,
          error: 'File format not accepted for this type.',
        },
      });
      return;
    }

    const dossier = this.dossierId.trim() || undefined;
    this.ingestion
      .upload(channel.id, job.file, dossier, job.tag)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => this.patchJob(job, { progress: p }));
  }

  private patchJob(job: FileJob, partial: Partial<FileJob>): void {
    this.queue.update((q) =>
      q.map((j) => (j === job ? { ...j, ...partial } : j)),
    );
  }

  private accepts(ch: IngestionChannel, file: File): boolean {
    if (ch.mimeTypes.includes(file.type)) {
      return true;
    }
    if (!file.type) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      const allowed = ch.accept.split(',').map((a) => a.replace('.', '').trim().toLowerCase());
      return allowed.includes(ext);
    }
    return false;
  }

  private patchDrag(dragging: boolean): void {
    this.states.update((s) => ({ ...s, main: { dragging } }));
  }

  tagLabel(tag: UploadDocumentTag): string {
    return this.tagOptions.find((t) => t.id === tag)?.label ?? tag;
  }
}
