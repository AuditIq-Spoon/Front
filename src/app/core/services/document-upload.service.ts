import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocumentIngestType } from '../models/mvp.models';

export interface DocumentUploadState {
  percent: number;
  done: boolean;
  error?: string;
}

/**
 * POST multipart to `/api/v1/documents?type=...`
 * Form: `file` (required), optional `parentTenderId` for quotes linked to a tender.
 */
@Injectable({ providedIn: 'root' })
export class DocumentUploadService {
  private readonly http = inject(HttpClient);

  private url(type: DocumentIngestType, parentTenderId?: string): string {
    const base = environment.apiBaseUrl.replace(/\/$/, '');
    const path = environment.documentsUploadPath.replace(/^\//, '');
    let u = `${base}/${path}?type=${encodeURIComponent(type)}`;
    if (type === 'quote' && parentTenderId?.trim()) {
      u += `&parentTenderId=${encodeURIComponent(parentTenderId.trim())}`;
    }
    return u;
  }

  upload(
    file: File,
    type: DocumentIngestType,
    parentTenderId?: string,
  ): Observable<DocumentUploadState> {
    const form = new FormData();
    form.append('file', file, file.name);
    if (type === 'quote' && parentTenderId?.trim()) {
      form.append('parentTenderId', parentTenderId.trim());
    }

    const req = new HttpRequest('POST', this.url(type, parentTenderId), form, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      map((event: HttpEvent<unknown>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return {
              percent: event.total ? Math.round((100 * event.loaded) / event.total) : 0,
              done: false,
            } satisfies DocumentUploadState;
          case HttpEventType.Response:
            return { percent: 100, done: true } satisfies DocumentUploadState;
          default:
            return null;
        }
      }),
      filter((s): s is DocumentUploadState => s !== null),
      catchError((err: HttpErrorResponse | Error) =>
        of({
          percent: 100,
          done: true,
          error:
            ('message' in err ? err.message : String(err)) ||
            'Upload failed — check API URL and network.',
        }),
      ),
    );
  }
}
