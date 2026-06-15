import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtService } from '../../services/court.service';
import { CourtDashboard } from '../../models/court-dashboard.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-court-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './court-dashboard.component.html',
  styleUrl: './court-dashboard.component.css'
})
export class CourtDashboardComponent implements OnInit {
  private courtService = inject(CourtService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  dashboardData: CourtDashboard | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.courtService.getDashboard().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching dashboard', err);
        this.errorMessage = 'Failed to load dashboard data. Please try again later.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  navigateToCases(status?: string) {
    if (status) {
      this.router.navigate(['/court/cases'], { queryParams: { status } });
    } else {
      this.router.navigate(['/court/cases']);
    }
  }
}
