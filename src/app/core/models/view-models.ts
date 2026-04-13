export type DossierStatus = 'in_progress' | 'analyzed';
export type RiskBand = 'high' | 'medium' | 'low';
export type AnomalyType =
  | 'surfacturation'
  | 'paiement_sans_facture'
  | 'favoritisme'
  | 'collusion'
  | 'manipulation_ao'
  | 'anomalie_financiere';
export type HumanReviewStatus = 'pending' | 'confirmed' | 'rejected';

export interface AnomalyVm {
  id: string;
  type: AnomalyType;
  typeLabel: string;
  severity: RiskBand;
  explanation: string;
  impactScore: number;
  humanStatus: HumanReviewStatus;
  humanNote?: string;
}

export interface ReconciliationRowVm {
  invoiceRef: string;
  paymentRef: string;
  amountInvoice: number;
  amountPayment: number;
  status: 'match' | 'missing_invoice' | 'missing_payment' | 'mismatch';
}

export interface TenderBidVm {
  supplierName: string;
  amount: number;
  rank: number;
}

export interface TenderVm {
  id: string;
  title: string;
  winner: string;
  secondPlace: string;
  gapPercent: number;
  coherenceNote: string;
  bids: TenderBidVm[];
}

export interface DecisionPatternVm {
  label: string;
  detail: string;
  riskIndicator: RiskBand;
}

export interface SupplierSummaryVm {
  id: string;
  name: string;
  winRate: number;
  frequency: number;
  avgPriceDelta: number;
  riskNote: string;
}

export interface MarketCompareVm {
  label: string;
  marketPrice: number;
  invoicePrice: number;
  gapPercent: number;
}

export interface DossierVm {
  id: string;
  label: string;
  status: DossierStatus;
  riskScore: number;
  riskBand: RiskBand;
  anomalyCount: number;
  updatedAt: string;
  anomalies: AnomalyVm[];
  reconciliation: ReconciliationRowVm[];
  tender: TenderVm;
  decisionPatterns: DecisionPatternVm[];
  suppliers: SupplierSummaryVm[];
  market: MarketCompareVm[];
  priceHistogram: number[];
  supplierUsage: { name: string; count: number }[];
  kpi: { mean: number; median: number; stdev: number };
}

export type UploadDocumentTag = 'facture' | 'devis' | 'releve' | 'autre';

export interface UploadTagOption {
  id: UploadDocumentTag;
  label: string;
  channelId: string;
  hint: string;
}
