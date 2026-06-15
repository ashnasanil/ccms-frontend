import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { BatchLogDto } from '../../models/dtos';

@Component({
  selector: 'app-batch-logs',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './batch-logs.component.html',
  styleUrl: './batch-logs.component.css'
})
export class BatchLogsComponent implements OnInit {
  displayedColumns: string[] = ['runTime', 'durationInSeconds', 'processedCount', 'validatedCount', 'notFoundCount', 'status'];
  logs: BatchLogDto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getBatchLogs().subscribe(data => {
      this.logs = data.sort((a, b) => new Date(b.runTime).getTime() - new Date(a.runTime).getTime());
    });
  }
}
