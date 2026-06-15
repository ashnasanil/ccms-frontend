import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CaseDetailDto, CaseResponseDto } from '../../models/dtos';
import { CaseStatus, OrderType, ResponseType } from '../../models/enums';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.css'
})
export class CaseDetailComponent implements OnInit {
  caseDetail: CaseDetailDto | null = null;
  responseForm: FormGroup;
  isSubmitting = false;

  CaseStatus = CaseStatus;
  OrderType = OrderType;
  ResponseType = ResponseType;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.responseForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      remarks: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCase(id);
    }
  }

  loadCase(id: string): void {
    this.apiService.getCaseDetail(id).subscribe(data => {
      this.caseDetail = data;
    });
  }

  get showResponseForm(): boolean {
    return this.caseDetail?.status === CaseStatus.AccountValidated && !this.caseDetail?.existingResponse;
  }

  submitResponse(): void {
    if (this.responseForm.invalid || !this.caseDetail) return;

    this.isSubmitting = true;
    const amount = this.responseForm.value.amount;
    const remarks = this.responseForm.value.remarks;

    if (this.caseDetail.orderType === OrderType.FreezeAccount) {
      this.apiService.submitFreezeResponse(this.caseDetail.id, {
        caseId: this.caseDetail.id,
        freezeAmount: amount,
        remarks: remarks
      }).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.handleError()
      });
    } else {
      this.apiService.submitBalanceResponse(this.caseDetail.id, {
        caseId: this.caseDetail.id,
        balanceAmount: amount,
        remarks: remarks
      }).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.handleError()
      });
    }
  }

  handleSuccess(): void {
    this.snackBar.open('Response submitted successfully', 'Close', { duration: 3000 });
    if (this.caseDetail) {
      this.loadCase(this.caseDetail.id); // Reload to hide form and show submitted response
    }
    this.isSubmitting = false;
  }

  handleError(): void {
    this.snackBar.open('Error submitting response', 'Close', { duration: 3000 });
    this.isSubmitting = false;
  }
}
