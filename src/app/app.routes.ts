import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'court/dashboard',
    loadComponent: () => import('./features/court/components/court-dashboard/court-dashboard.component').then(m => m.CourtDashboardComponent)
  },
  {
    path: 'court/cases/new',
    loadComponent: () => import('./features/court/components/create-case/create-case.component').then(m => m.CreateCaseComponent)
  },
  {
    path: '',
    redirectTo: 'court/dashboard',
    pathMatch: 'full'
  }
];
