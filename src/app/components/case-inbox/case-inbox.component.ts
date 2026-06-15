import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CaseListDto } from '../../models/dtos';
import { OrderType } from '../../models/enums';

@Component({
  selector: 'app-case-inbox',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTableModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './case-inbox.component.html',
  styleUrl: './case-inbox.component.css'
})
export class CaseInboxComponent implements OnInit {
  displayedColumns: string[] = ['caseNumber', 'defendantName', 'orderType', 'actions'];
  
  awaitingCases: CaseListDto[] = [];
  completedCases: CaseListDto[] = [];
  autoResolvedCases: CaseListDto[] = [];
  pendingBatchCases: CaseListDto[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCases('AwaitingAction');
  }

  onTabChange(event: any): void {
    const tabLabels = ['AwaitingAction', 'Completed', 'AutoResolved', 'PendingBatch'];
    this.loadCases(tabLabels[event.index]);
  }

  loadCases(category: string): void {
    this.apiService.getCasesByStatus(category).subscribe(cases => {
      switch (category) {
        case 'AwaitingAction': this.awaitingCases = cases; break;
        case 'Completed': this.completedCases = cases; break;
        case 'AutoResolved': this.autoResolvedCases = cases; break;
        case 'PendingBatch': this.pendingBatchCases = cases; break;
      }
    });
  }

  viewCase(id: string): void {
    this.router.navigate(['/case', id]);
  }

  getOrderTypeName(orderType: number): string {
    return OrderType[orderType];
  }
}
