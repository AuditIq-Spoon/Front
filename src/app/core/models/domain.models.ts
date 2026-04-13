/** Domain objects (structuring step) */
export interface Invoice {
  id: string;
  supplierRef?: string;
  amount?: number;
  currency?: string;
  issuedAt?: string;
}

export interface Transaction {
  id: string;
  amount?: number;
  bookedAt?: string;
  counterparty?: string;
}

export interface Tender {
  id: string;
  title?: string;
  openedAt?: string;
  closedAt?: string;
}

export interface Bid {
  id: string;
  tenderId: string;
  supplierId: string;
  amount?: number;
}

export interface Supplier {
  id: string;
  name: string;
  normalizedName?: string;
}

export interface Decision {
  id: string;
  tenderId?: string;
  decidedBy?: string;
  decidedAt?: string;
  winningBidId?: string;
}

export type PipelineStepId =
  | 'collect'
  | 'extract'
  | 'structure'
  | 'match'
  | 'analyze'
  | 'anomalies'
  | 'report';

export interface PipelineStep {
  id: PipelineStepId;
  label: string;
  description: string;
}
