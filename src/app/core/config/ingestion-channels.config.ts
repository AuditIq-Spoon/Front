import { InjectionToken } from '@angular/core';

/** One ingestion channel = one backend webservice endpoint (multi-service architecture). */
export interface IngestionChannel {
  id: string;
  label: string;
  description: string;
  /** Relative to environment.apiBaseUrl */
  endpoint: string;
  accept: string;
  mimeTypes: string[];
  /** For UI grouping */
  category: 'financial' | 'procurement' | 'reference' | 'market';
}

export const INGESTION_CHANNELS: IngestionChannel[] = [
  {
    id: 'invoices',
    label: 'Invoices',
    description: 'PDF — OCR & business field extraction',
    endpoint: '/api/v1/ingest/invoices',
    accept: '.pdf',
    mimeTypes: ['application/pdf'],
    category: 'financial',
  },
  {
    id: 'quotes-tenders',
    label: 'Quotes & tenders',
    description: 'PDF, Excel — bid normalization',
    endpoint: '/api/v1/ingest/quotes-tenders',
    accept: '.pdf,.xlsx,.xls',
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    category: 'procurement',
  },
  {
    id: 'bank-statements',
    label: 'Bank statements',
    description: 'CSV, Excel — reconciliation',
    endpoint: '/api/v1/ingest/bank-statements',
    accept: '.csv,.xlsx,.xls',
    mimeTypes: [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    category: 'financial',
  },
  {
    id: 'suppliers',
    label: 'Supplier master data',
    description: 'Optional reference (CSV/Excel)',
    endpoint: '/api/v1/ingest/suppliers',
    accept: '.csv,.xlsx,.xls',
    mimeTypes: [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    category: 'reference',
  },
  {
    id: 'market-prices',
    label: 'Market prices',
    description: 'API imports / aggregate files',
    endpoint: '/api/v1/ingest/market-prices',
    accept: '.csv,.json',
    mimeTypes: ['text/csv', 'application/json'],
    category: 'market',
  },
];

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => '/',
});
