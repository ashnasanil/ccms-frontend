import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

// Court Components
import { CourtDashboardComponent } from './features/court/components/court-dashboard/court-dashboard.component';
import { CaseListComponent } from './features/court/components/case-list/case-list.component';
import { CreateCaseComponent } from './features/court/components/create-case/create-case.component';
import { CaseDetailComponent as CourtCaseDetailComponent } from './features/court/components/case-detail/case-detail.component';

// Bank Components
import { BankDashboardComponent } from './components/bank-dashboard/bank-dashboard.component';
import { CaseInboxComponent } from './components/case-inbox/case-inbox.component';
import { CaseDetailComponent as BankCaseDetailComponent } from './components/case-detail/case-detail.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'court-dashboard',
        component: CourtDashboardComponent
      },
      {
        path: 'court/cases',
        component: CaseListComponent
      },
      {
        path: 'court/cases/new',
        component: CreateCaseComponent
      },
      {
        path: 'court/cases/:id',
        component: CourtCaseDetailComponent
      },
      {
        path: 'bank-dashboard',
        component: BankDashboardComponent
      },
      {
        path: 'bank/inbox',
        component: CaseInboxComponent
      },
      {
        path: 'bank/cases/:id',
        component: BankCaseDetailComponent
      },
      {
        path: 'case/:id', // Retaining original bank case detail path just in case
        component: BankCaseDetailComponent
      },
      {
        path: '',
        redirectTo: 'court-dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
