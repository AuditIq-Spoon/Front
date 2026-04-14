import { AppelOffre, Offre } from '../models/mvp.models';

export const MOCK_APPELS_OFFRES: AppelOffre[] = [
  {
    id: 'ao-2026-01',
    reference: 'TND-INFRA-NORTH-2026',
    title: 'Network infrastructure — North region',
    openedAt: '2026-01-10',
    closedAt: '2026-02-28',
    budgetHint: 450000,
    currency: 'EUR',
  },
  {
    id: 'ao-2026-02',
    reference: 'TND-CLOUD-SRV-14',
    title: 'Managed cloud services (single lot)',
    openedAt: '2026-02-01',
    closedAt: '2026-03-15',
    budgetHint: 120000,
    currency: 'EUR',
  },
  {
    id: 'ao-2026-03',
    reference: 'TND-OFFICE-SUPPLY',
    title: 'Office supplies — framework agreement',
    openedAt: '2026-01-20',
    closedAt: '2026-04-01',
    currency: 'EUR',
  },
];

export const MOCK_OFFRES: Offre[] = [
  {
    id: 'off-001',
    tenderId: 'ao-2026-01',
    supplierName: 'BuildCorp SA',
    amount: 428000,
    currency: 'EUR',
    submittedAt: '2026-02-20',
    reference: 'Q-BC-2026-118',
  },
  {
    id: 'off-002',
    tenderId: 'ao-2026-01',
    supplierName: 'InfraLine SAS',
    amount: 441200,
    currency: 'EUR',
    submittedAt: '2026-02-21',
    reference: 'Q-IL-772',
  },
  {
    id: 'off-003',
    tenderId: 'ao-2026-01',
    supplierName: 'NordWorks',
    amount: 399500,
    currency: 'EUR',
    submittedAt: '2026-02-22',
    reference: 'Q-NW-INF-01',
  },
  {
    id: 'off-004',
    tenderId: 'ao-2026-02',
    supplierName: 'CloudNine EU',
    amount: 98500,
    currency: 'EUR',
    submittedAt: '2026-03-01',
    reference: 'Q-C9-2026-03',
  },
  {
    id: 'off-005',
    tenderId: 'ao-2026-02',
    supplierName: 'StackHost',
    amount: 112000,
    currency: 'EUR',
    submittedAt: '2026-03-02',
    reference: 'Q-SH-CLOUD-14',
  },
];

export function getTenderById(id: string): AppelOffre | undefined {
  return MOCK_APPELS_OFFRES.find((a) => a.id === id);
}

export function getOffersByTender(tenderId: string): Offre[] {
  return MOCK_OFFRES.filter((o) => o.tenderId === tenderId);
}

export function getOfferById(id: string): Offre | undefined {
  return MOCK_OFFRES.find((o) => o.id === id);
}

export function getTenderForOffer(offer: Offre): AppelOffre | undefined {
  return getTenderById(offer.tenderId);
}
