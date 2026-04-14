/** Mock rows for the analysis report table (MVP demo). */
export interface AnalysisFindingRow {
  code: string;
  theme: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  dataPoints: string;
}

export const MOCK_ANALYSIS_FINDINGS: AnalysisFindingRow[] = [
  {
    code: 'FIN-01',
    theme: 'Over-invoicing',
    description: 'Invoiced price vs market median > 15% on comparable line items.',
    severity: 'high',
    dataPoints: 'Gross amount, line description, price grid, market benchmark',
  },
  {
    code: 'FIN-02',
    theme: 'Payment without invoice',
    description: 'Reconciled transfers missing invoice reference in narrative or beyond threshold delay.',
    severity: 'medium',
    dataPoints: 'Payment ref, value date, counterparty, linked invoice',
  },
  {
    code: 'PROC-01',
    theme: 'Favoritism',
    description: 'Same supplier winning correlated lots with narrow price gaps vs runners-up.',
    severity: 'high',
    dataPoints: 'Supplier ID / name, tender history, bid amounts',
  },
  {
    code: 'PROC-02',
    theme: 'Collusion / tenders',
    description: 'Abnormally low bid dispersion (low stdev vs lot value).',
    severity: 'medium',
    dataPoints: 'Bid amounts, submission time, relative anonymity of bids',
  },
  {
    code: 'PROC-03',
    theme: 'Specification steering',
    description: 'Technical requirements aligned with a single incumbent supplier profile.',
    severity: 'low',
    dataPoints: 'Spec versions, authors, supplier referenced in history',
  },
];
