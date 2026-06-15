import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { DashboardSummaryDto, BatchLogDto } from '../../models/dtos';

@Component({
  selector: 'app-bank-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './bank-dashboard.component.html',
  styleUrl: './bank-dashboard.component.css'
})
export class BankDashboardComponent implements OnInit {
  summary: DashboardSummaryDto | null = null;
  lastBatchLog: BatchLogDto | null = null;
  loadingBatch = false;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getDashboardSummary().subscribe(data => {
      this.summary = data;
    });

    this.apiService.getBatchLogs().subscribe(logs => {
      if (logs && logs.length > 0) {
        // Assume first is the latest or sort by runTime
        this.lastBatchLog = logs.sort((a, b) => new Date(b.runTime).getTime() - new Date(a.runTime).getTime())[0];
      }
    });
  }

  triggerBatch(): void {
    this.loadingBatch = true;
    this.apiService.runBatch().subscribe({
      next: () => {
        this.snackBar.open('Batch validation triggered successfully', 'Close', { duration: 3000 });
        this.loadData();
        this.loadingBatch = false;
      },
      error: () => {
        this.snackBar.open('Error triggering batch validation', 'Close', { duration: 3000 });
        this.loadingBatch = false;
      }
    });
  }
}
