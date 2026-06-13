import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-court-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-wrapper">
      <nav class="nav-bar">
        <span class="nav-brand">Court Case Management System</span>
        <button class="logout-button" (click)="onLogout()">Logout</button>
      </nav>
      <main class="dashboard-content">
        <div class="content-card">
          <h1>Welcome Court Officer</h1>
          <p class="role-badge">Role: Court</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-wrapper {
      min-height: 100vh;
      background-color: #f7fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2d3748;
      padding: 1rem 2rem;
      color: white;
    }
    .nav-brand {
      font-weight: 600;
      font-size: 1.2rem;
      letter-spacing: -0.025em;
    }
    .logout-button {
      background-color: #e53e3e;
      color: white;
      border: none;
      padding: 0.5rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    .logout-button:hover {
      background-color: #c53030;
    }
    .dashboard-content {
      padding: 3rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .content-card {
      background: white;
      border-radius: 12px;
      padding: 2.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    h1 {
      font-size: 2.25rem;
      color: #1a202c;
      margin: 0 0 1rem 0;
      font-weight: 700;
    }
    .role-badge {
      display: inline-block;
      background-color: #ebf8ff;
      color: #2b6cb0;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      margin: 0;
    }
  `]
})
export class CourtDashboardComponent {
  private readonly authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
  }
}
