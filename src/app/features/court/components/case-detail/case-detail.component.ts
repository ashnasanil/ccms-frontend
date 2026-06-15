import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourtService } from '../../services/court.service';
import { CaseDetail } from '../../models/case-detail.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatListModule, MatChipsModule],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.css'
})
export class CaseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courtService = inject(CourtService);
  private cdr = inject(ChangeDetectorRef);

  caseDetail: CaseDetail | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCase(id);
    } else {
      this.errorMessage = 'Invalid Case ID provided.';
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  private fetchCase(id: string): void {
    this.courtService.getCaseById(id).subscribe({
      next: (data) => {
        this.caseDetail = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching case details', err);
        this.errorMessage = 'Could not retrieve case details. It may not exist.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getAttachmentUrl(filePath: string): string {
    return environment.apiUrl.replace(/\/api$/, '') + filePath;
  }
}
