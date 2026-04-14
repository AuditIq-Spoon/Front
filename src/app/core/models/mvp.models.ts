/** MVP — document types (query param `type` on POST /api/v1/documents) */
export type DocumentIngestType = 'bank_statement' | 'invoice' | 'quote';

/** Tender (parent for quotes / bids) */
export interface AppelOffre {
  id: string;
  reference: string;
  title: string;
  openedAt: string;
  closedAt: string;
  budgetHint?: number;
  currency: string;
}

/** Quote or bid linked to a tender */
export interface Offre {
  id: string;
  tenderId: string;
  supplierName: string;
  amount: number;
  currency: string;
  submittedAt: string;
  reference: string;
}

export interface AuditPeriod {
  startDate: string;
  endDate: string;
  launchedAt: string;
  id: string;
}
