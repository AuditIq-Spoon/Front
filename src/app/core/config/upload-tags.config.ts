import { UploadTagOption } from '../models/view-models';

export const UPLOAD_TAG_OPTIONS: UploadTagOption[] = [
  {
    id: 'facture',
    label: 'Invoice',
    channelId: 'invoices',
    hint: 'PDF — OCR & field extraction',
  },
  {
    id: 'devis',
    label: 'Quote / tender',
    channelId: 'quotes-tenders',
    hint: 'PDF, Excel',
  },
  {
    id: 'releve',
    label: 'Bank statement',
    channelId: 'bank-statements',
    hint: 'CSV, Excel',
  },
  {
    id: 'autre',
    label: 'Other document',
    channelId: 'quotes-tenders',
    hint: 'PDF, Excel — manual classification',
  },
];
