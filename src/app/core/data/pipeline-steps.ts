import { PipelineStep } from '../models/domain.models';

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'collect', label: 'Collect', description: 'Invoices, quotes, bank feeds, suppliers, market data' },
  { id: 'extract', label: 'Extract', description: 'OCR, parsing, cleansing, normalization' },
  { id: 'structure', label: 'Structure', description: 'Invoice, Transaction, Tender, Bid, Supplier, Decision' },
  { id: 'match', label: 'Match', description: 'Invoice ↔ payment, quote ↔ tender, supplier ↔ history' },
  { id: 'analyze', label: 'Analyze', description: 'Finance, procurement, decision intelligence' },
  { id: 'anomalies', label: 'Anomalies', description: 'Business rules, scoring, alerts' },
  { id: 'report', label: 'Report', description: 'Dashboard, risk score, exportable reports' },
];
