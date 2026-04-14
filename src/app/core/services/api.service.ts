import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  AuditSession,
  AuditSessionCreate,
  AuditSessionListItem,
  DocumentListItem,
  DocumentUpload,
  DocumentType,
  Tender,
} from '../models/audit.models';

export interface UploadPayload {
  file: File;
  docType: DocumentType;
  tenderId?: string;
}

/**
 * ApiService — single gateway for all HTTP calls to the FastAPI backend.
 *
 * Design decisions:
 * - All methods return Observables so callers can manage subscription lifetimes.
 * - A centralized error handler normalises error payloads into a standard Error.
 * - No local state is kept here; state belongs in feature components or stores.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // ── Documents ──────────────────────────────────────────────────────────────

  /**
   * Upload documents with per-file type overrides and optional tender assignment.
   */
  uploadDocuments(items: UploadPayload[]): Observable<DocumentUpload[]> {
    const form = new FormData();
    items.forEach(item => form.append('files', item.file, item.file.name));
    form.append('document_types', items.map(i => i.docType).join(','));
    form.append('tender_ids', items.map(i => i.tenderId ?? '').join(','));
    return this.http
      .post<DocumentUpload[]>(`${this.base}/upload`, form)
      .pipe(catchError(this.handleError));
  }

  /**
   * List uploaded documents. When both startDate and endDate are provided
   * (YYYY-MM-DD), returns only rows whose transaction_date falls in that inclusive range
   * (same rule as INOUT audit sessions).
   */
  listDocuments(startDate?: string, endDate?: string): Observable<DocumentListItem[]> {
    let params = new HttpParams();
    if (startDate && endDate) {
      params = params.set('start_date', startDate).set('end_date', endDate);
    }
    return this.http
      .get<DocumentListItem[]>(`${this.base}/documents`, { params })
      .pipe(catchError(this.handleError));
  }

  // ── Tenders ────────────────────────────────────────────────────────────────

  /** List all tenders / Appels d'Offre. */
  listTenders(): Observable<Tender[]> {
    return this.http
      .get<Tender[]>(`${this.base}/tenders`)
      .pipe(catchError(this.handleError));
  }

  /** Get a single tender by ID. */
  getTender(tenderId: string): Observable<Tender> {
    return this.http
      .get<Tender>(`${this.base}/tenders/${tenderId}`)
      .pipe(catchError(this.handleError));
  }

  // ── Audit Sessions ─────────────────────────────────────────────────────────

  /**
   * Create a new audit session and trigger the AI pipeline.
   * Returns immediately with a PENDING session; subscribe to WS for progress.
   */
  createSession(payload: AuditSessionCreate): Observable<AuditSession> {
    return this.http
      .post<AuditSession>(`${this.base}/sessions`, payload)
      .pipe(catchError(this.handleError));
  }

  /** List all sessions for the dashboard. */
  listSessions(): Observable<AuditSessionListItem[]> {
    return this.http
      .get<AuditSessionListItem[]>(`${this.base}/sessions`)
      .pipe(catchError(this.handleError));
  }

  /** Get full detail of a single session (including anomalies). */
  getSession(sessionId: string): Observable<AuditSession> {
    return this.http
      .get<AuditSession>(`${this.base}/sessions/${sessionId}`)
      .pipe(catchError(this.handleError));
  }

  // ── Error handling ─────────────────────────────────────────────────────────

  private handleError(err: HttpErrorResponse): Observable<never> {
    const message: string =
      err.error?.detail ??
      err.error?.message ??
      err.message ??
      'An unexpected error occurred.';
    console.error('[ApiService]', message, err);
    return throwError(() => new Error(message));
  }
}
