import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourtService } from '../../services/court.service';
import { OrderType, CreateCaseResponse } from '../../models/create-case.model';

@Component({
  selector: 'app-create-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-case.component.html',
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private courtService = inject(CourtService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  caseForm!: FormGroup;
  
  // File objects
  courtOrderFile: File | null = null;
  aadhaarCopyFile: File | null = null;
  panCopyFile: File | null = null;

  // State
  isSubmitting = false;
  errorMessage = '';
  
  // Enum exposure for template
  OrderType = OrderType;

  ngOnInit(): void {
    this.initForm();
    this.setupDynamicValidation();
  }

  private initForm(): void {
    this.caseForm = this.fb.group({
      complainantName: ['', Validators.required],
      defendantName: ['', Validators.required],
      aadhaarNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      orderType: [OrderType.FreezeAccount, Validators.required],
      freezeAmount: ['', Validators.required],
    });
  }

  private setupDynamicValidation(): void {
    const orderTypeControl = this.caseForm.get('orderType');
    const freezeAmountControl = this.caseForm.get('freezeAmount');

    orderTypeControl?.valueChanges.subscribe((type: number) => {
      const orderTypeVal = Number(type);
      if (orderTypeVal === OrderType.FreezeAccount) {
        freezeAmountControl?.setValidators([Validators.required]);
      } else {
        freezeAmountControl?.clearValidators();
        freezeAmountControl?.setValue('');
      }
      freezeAmountControl?.updateValueAndValidity();
      this.cdr.markForCheck();
    });
  }

  onFileChange(event: Event, fileType: 'courtOrder' | 'aadhaar' | 'pan'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (fileType === 'courtOrder') this.courtOrderFile = file;
      if (fileType === 'aadhaar') this.aadhaarCopyFile = file;
      if (fileType === 'pan') this.panCopyFile = file;
    } else {
      if (fileType === 'courtOrder') this.courtOrderFile = null;
      if (fileType === 'aadhaar') this.aadhaarCopyFile = null;
      if (fileType === 'pan') this.panCopyFile = null;
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    // Mark all as touched to trigger validation messages in UI
    if (this.caseForm.invalid || !this.courtOrderFile || !this.aadhaarCopyFile || !this.panCopyFile) {
      this.caseForm.markAllAsTouched();
      this.errorMessage = 'Please fill out all required fields and upload all mandatory documents.';
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    const values = this.caseForm.value;

    formData.append('ComplainantName', values.complainantName);
    formData.append('DefendantName', values.defendantName);
    formData.append('AadhaarNumber', values.aadhaarNumber);
    formData.append('PanNumber', values.panNumber);
    formData.append('AccountNumber', values.accountNumber);
    formData.append('BankName', values.bankName);
    formData.append('OrderType', values.orderType.toString());
    
    if (values.freezeAmount) {
      formData.append('FreezeAmount', values.freezeAmount.toString());
    }

    formData.append('CourtOrderFile', this.courtOrderFile);
    formData.append('AadhaarCopyFile', this.aadhaarCopyFile);
    formData.append('PanCopyFile', this.panCopyFile);

    this.courtService.createCase(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.router.navigate(['/court/cases', response.caseNumber]);
      },
      error: (err) => {
        console.error('Error creating case', err);
        this.errorMessage = err.error?.message || 'An error occurred while creating the case.';
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}
