import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { API_BASE_URL, INGESTION_CHANNELS, IngestionChannel } from '../config/ingestion-channels.config';

export interface UploadProgress {
  channelId: string;
  fileName: string;
  percent: number;
  done: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class IngestionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  get channels(): IngestionChannel[] {
    return INGESTION_CHANNELS;
  }

  channel(id: string): IngestionChannel | undefined {
    return INGESTION_CHANNELS.find((c) => c.id === id);
  }

  /**
   * POST multipart to the dedicated webservice for this channel.
   * Backend teams can split implementations per endpoint (microservices).
   */
  upload(
    channelId: string,
    file: File,
    dossierId?: string,
    documentTag?: string,
  ): Observable<UploadProgress> {
    const channel = this.channel(channelId);
    if (!channel) {
      throw new Error(`Unknown ingestion channel: ${channelId}`);
    }

    const form = new FormData();
    form.append('file', file, file.name);
    if (dossierId) {
      form.append('dossierId', dossierId);
    }
    if (documentTag) {
      form.append('documentType', documentTag);
    }

    const url = `${this.baseUrl.replace(/\/$/, '')}${channel.endpoint}`;
    const req = new HttpRequest('POST', url, form, { reportProgress: true });

    return this.http.request(req).pipe(
      map((event: HttpEvent<unknown>) => this.mapEvent(channelId, file.name, event)),
      filter((p): p is UploadProgress => p !== null),
      catchError((err: HttpErrorResponse | Error) =>
        of({
          channelId,
          fileName: file.name,
          percent: 100,
          done: true,
          error:
            ('message' in err ? err.message : String(err)) ||
            'Upload failed (check API URL and network).',
        }),
      ),
    );
  }

  private mapEvent(
    channelId: string,
    fileName: string,
    event: HttpEvent<unknown>,
  ): UploadProgress | null {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return {
          channelId,
          fileName,
          percent: event.total ? Math.round((100 * event.loaded) / event.total) : 0,
          done: false,
        };
      case HttpEventType.Response:
        return { channelId, fileName, percent: 100, done: true };
      default:
        return null;
    }
  }
}
