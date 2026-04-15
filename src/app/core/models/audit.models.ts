/**
 * Strongly-typed TypeScript interfaces mirroring the FastAPI Pydantic schemas.
 * Keep in sync with backend/app/models/schemas.py.
 */

// ── Enumerations ─────────────────────────────────────────────────────────────

export type AuditType = 'INOUT' | 'TENDER';

export type SessionStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export type DocumentType =
  | 'INVOICE'
  | 'BANK_STATEMENT'
  | 'QUOTE'
  | 'PRICE_BOOK'
  | 'BID'
  | 'MARKET_PLACE'
  | 'OTHER';

export type TenderStatus = 'OPEN' | 'AWARDED' | 'CANCELLED';

export type AnomalySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ProgressStatus = 'PENDING' | 'RUNNING' | 'DONE' | 'ERROR';

// ── Document ─────────────────────────────────────────────────────────────────

// ── Tender ───────────────────────────────────────────────────────────────────

export interface TenderWinner {
  company: string;
  amount: number;
  awarded_at: string;
}

export interface Tender {
  id: string;
  reference: string;
  name: string;
  description: string;
  budget: number;
  currency: string;
  status: TenderStatus;
  deadline: string | null;
  winner: TenderWinner | null;
  created_at: string;
}

// ── Document ─────────────────────────────────────────────────────────────────

export interface DocumentUpload {
  id: string;
  filename: string;
  document_type: DocumentType;
  file_size_bytes: number;
  content_type: string;
  tender_id: string | null;
  /** YYYY-MM-DD — used for INOUT audit date windows */
  transaction_date: string | null;
  extracted_json: Record<string, unknown>;
  uploaded_at: string;
}

/** GET /upload/n8n-status/{documentId} — payload after n8n POSTs to /webhook/n8n-result-upload */
export interface UploadN8nResultPayload {
  status: string;
  document_id: string;
  session_id?: string;
  risk_score: number;
  risk_summary: string;
  anomalies: Record<string, unknown>[];
  processing_metadata?: Record<string, unknown>;
}

export interface UploadN8nStatusResponse {
  status: 'pending' | 'ready' | 'timeout';
  document_id?: string;
  result?: UploadN8nResultPayload;
}

/** Row returned by GET /documents (no full OCR JSON). */
export interface DocumentListItem {
  id: string;
  filename: string;
  document_type: DocumentType;
  file_size_bytes: number;
  content_type: string;
  tender_id: string | null;
  transaction_date: string | null;
  uploaded_at: string;
}

/** Human-readable label for each document type. */
export const DOC_TYPE_LABELS: Record<DocumentType, string> = {
  INVOICE:       'Invoice / Facture',
  BANK_STATEMENT:'Bank Statement / Relevé',
  QUOTE:         'Quote / Devis',
  PRICE_BOOK:    'Price Book / Catalogue',
  BID:           'Bid / Soumission',
  MARKET_PLACE:  'Market Study / Comparatif',
  OTHER:         'Other / Autre',
};

/** Document types that should be linked to a tender. */
export const TENDER_DOCUMENT_TYPES: DocumentType[] = ['QUOTE', 'BID', 'MARKET_PLACE'];

// ── Audit Session params ──────────────────────────────────────────────────────

export interface INOUTParams {
  audit_type: 'INOUT';
  start_date: string; // ISO date string YYYY-MM-DD
  end_date: string;
}

export interface TenderParams {
  audit_type: 'TENDER';
  tender_id: string | null;
  project_name: string;
}

export type AuditSessionParams = INOUTParams | TenderParams;

export interface AuditSessionCreate {
  params: AuditSessionParams;
}

// ── Audit Session ─────────────────────────────────────────────────────────────

export interface AnomalyFlag {
  code: string;
  severity: AnomalySeverity;
  description: string;
  affected_documents: string[];
  delta_amount: number | null;
}

export interface AuditSession {
  id: string;
  audit_type: AuditType;
  status: SessionStatus;
  params: Record<string, unknown>;
  risk_score: number | null;
  risk_summary: string | null;
  anomalies: AnomalyFlag[];
  created_at: string;
  completed_at: string | null;
}

export interface AuditSessionListItem {
  id: string;
  audit_type: AuditType;
  status: SessionStatus;
  risk_score: number | null;
  risk_summary: string | null;
  params: Record<string, unknown>;
  created_at: string;
}

// ── WebSocket events ──────────────────────────────────────────────────────────

export interface WsProgressEvent {
  type: 'PROGRESS';
  session_id: string;
  step: number;
  total_steps: number;
  label: string;
  detail: string | null;
  status: ProgressStatus;
  timestamp: string;
}

export interface WsResultEvent {
  type: 'RESULT';
  session_id: string;
  risk_score: number;
  risk_summary: string;
  anomalies: AnomalyFlag[];
  timestamp: string;
}

export interface WsErrorEvent {
  type: 'ERROR';
  session_id: string;
  message: string;
  timestamp: string;
}

export type WsEvent = WsProgressEvent | WsResultEvent | WsErrorEvent;

// ── UI helpers ────────────────────────────────────────────────────────────────

/** Returns the Tailwind badge class for a given risk score (0–100). */
export function riskBadgeClass(score: number | null): string {
  if (score === null) return 'badge-pending';
  if (score <= 20)    return 'badge-safe';
  if (score <= 40)    return 'badge-low';
  if (score <= 60)    return 'badge-medium';
  if (score <= 80)    return 'badge-high';
  return 'badge-critical';
}

/** Returns a human-readable risk label. */
export function riskLabel(score: number | null): string {
  if (score === null) return '—';
  if (score <= 20)    return 'Safe';
  if (score <= 40)    return 'Low Risk';
  if (score <= 60)    return 'Medium Risk';
  if (score <= 80)    return 'High Risk';
  return 'Critical';
}

/** Returns the CSS color variable for a risk score. */
export function riskColor(score: number | null): string {
  if (score === null) return '#94A3B8';
  if (score <= 20)    return '#22C55E';
  if (score <= 40)    return '#84CC16';
  if (score <= 60)    return '#F59E0B';
  if (score <= 80)    return '#F97316';
  return '#EF4444';
}
