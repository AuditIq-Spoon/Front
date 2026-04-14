import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard — AuditIQ',
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/upload/upload.component').then(m => m.UploadComponent),
    title: 'Upload Documents — AuditIQ',
  },
  {
    path: 'documents',
    loadComponent: () =>
      import('./features/documents/documents.component').then(m => m.DocumentsComponent),
    title: 'Documents — AuditIQ',
  },
  {
    path: 'new-session',
    loadComponent: () =>
      import('./features/session-creator/session-creator.component').then(m => m.SessionCreatorComponent),
    title: 'New Audit Session — AuditIQ',
  },
  {
    path: 'audit/:id',
    loadComponent: () =>
      import('./features/live-audit/live-audit.component').then(m => m.LiveAuditComponent),
    title: 'Live Audit — AuditIQ',
  },
  { path: '**', redirectTo: 'dashboard' },
];
