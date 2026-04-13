import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard-page.component').then((m) => m.DashboardPageComponent),
      },
      {
        path: 'cases',
        loadComponent: () =>
          import('./features/dossiers/dossiers-list-page.component').then((m) => m.DossiersListPageComponent),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./features/upload/upload-hub.component').then((m) => m.UploadHubComponent),
      },
      {
        path: 'cases/:id',
        loadComponent: () =>
          import('./features/dossier/dossier-shell.component').then((m) => m.DossierShellComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/dossier/dossier-overview.component').then((m) => m.DossierOverviewComponent),
          },
          {
            path: 'finance',
            loadComponent: () =>
              import('./features/dossier/dossier-finance.component').then((m) => m.DossierFinanceComponent),
          },
          {
            path: 'procurement',
            loadComponent: () =>
              import('./features/dossier/dossier-procurement.component').then(
                (m) => m.DossierProcurementComponent,
              ),
          },
          {
            path: 'tenders',
            loadComponent: () =>
              import('./features/dossier/dossier-tenders.component').then((m) => m.DossierTendersComponent),
          },
          {
            path: 'decisions',
            loadComponent: () =>
              import('./features/dossier/dossier-decisionnaire.component').then(
                (m) => m.DossierDecisionnaireComponent,
              ),
          },
          {
            path: 'validation',
            loadComponent: () =>
              import('./features/dossier/dossier-validation.component').then(
                (m) => m.DossierValidationComponent,
              ),
          },
          {
            path: 'suppliers',
            loadComponent: () =>
              import('./features/dossier/dossier-suppliers.component').then((m) => m.DossierSuppliersComponent),
          },
          {
            path: 'suppliers/:supplierId',
            loadComponent: () =>
              import('./features/dossier/dossier-supplier-detail.component').then(
                (m) => m.DossierSupplierDetailComponent,
              ),
          },
          {
            path: 'market',
            loadComponent: () =>
              import('./features/dossier/dossier-market.component').then((m) => m.DossierMarketComponent),
          },
          {
            path: 'report',
            loadComponent: () =>
              import('./features/dossier/dossier-report.component').then((m) => m.DossierReportComponent),
          },
        ],
      },
    ],
  },
];
