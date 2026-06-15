import { Routes } from '@angular/router';
import { BankDashboardComponent } from './components/bank-dashboard/bank-dashboard.component';
import { CaseInboxComponent } from './components/case-inbox/case-inbox.component';
import { CaseDetailComponent } from './components/case-detail/case-detail.component';
import { BatchLogsComponent } from './components/batch-logs/batch-logs.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: BankDashboardComponent },
  { path: 'inbox', component: CaseInboxComponent },
  { path: 'case/:id', component: CaseDetailComponent },
  { path: 'batch-logs', component: BatchLogsComponent }
];
