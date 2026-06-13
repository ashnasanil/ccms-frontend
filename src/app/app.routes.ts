import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'court/dashboard',
    loadComponent: () => import('./features/court/components/court-dashboard/court-dashboard.component').then(m => m.CourtDashboardComponent)
  },
  {
    path: '',
    redirectTo: 'court/dashboard',
    pathMatch: 'full'
  }
];
