import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'audit' },
      {
        path: 'audit',
        loadComponent: () =>
          import('./features/mvp/audit-launch-page.component').then((m) => m.AuditLaunchPageComponent),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./features/mvp/documents-hub.component').then((m) => m.DocumentsHubComponent),
      },
      {
        path: 'documents/tenders/:tenderId',
        loadComponent: () =>
          import('./features/mvp/tender-detail-page.component').then((m) => m.TenderDetailPageComponent),
      },
      {
        path: 'documents/offers/:offerId',
        loadComponent: () =>
          import('./features/mvp/offer-detail-page.component').then((m) => m.OfferDetailPageComponent),
      },
      {
        path: 'analysis',
        loadComponent: () =>
          import('./features/mvp/analysis-results-page.component').then((m) => m.AnalysisResultsPageComponent),
      },
    ],
  },
];
