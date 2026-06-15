import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CourtDashboardComponent } from './features/court/court-dashboard.component';
import { BankDashboardComponent } from './features/bank/bank-dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'court-dashboard',
    component: CourtDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'bank-dashboard',
    component: BankDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
