import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCaseComponent } from './create-case.component';
import { CourtService } from '../../services/court.service';
import { of, throwError } from 'rxjs';
import { OrderType } from '../../models/create-case.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CreateCaseComponent', () => {
  let component: CreateCaseComponent;
  let fixture: ComponentFixture<CreateCaseComponent>;
  let courtServiceSpy: { createCase: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    courtServiceSpy = {
      createCase: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CreateCaseComponent],
      providers: [
        { provide: CourtService, useValue: courtServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a properly initialized form', () => {
    expect(component.caseForm.contains('complainantName')).toBe(true);
    expect(component.caseForm.get('orderType')?.value).toBe(OrderType.FreezeAccount);
  });

  it('should dynamically update freezeAmount validation based on orderType', () => {
    const orderTypeControl = component.caseForm.get('orderType');
    const freezeAmountControl = component.caseForm.get('freezeAmount');

    // Default is FreezeAccount, so it should be required
    expect(freezeAmountControl?.validator).toBeTruthy();

    // Change to BalanceEnquiry
    orderTypeControl?.setValue(OrderType.BalanceEnquiry);
    expect(freezeAmountControl?.validator).toBeNull();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(courtServiceSpy.createCase).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Please fill out all required fields and upload all mandatory documents.');
  });

  it('should submit successfully if valid', () => {
    component.caseForm.setValue({
      complainantName: 'John Doe',
      defendantName: 'Jane Doe',
      aadhaarNumber: '123456789012',
      panNumber: 'ABCDE1234F',
      accountNumber: '1234567890',
      bankName: 'Test Bank',
      orderType: OrderType.BalanceEnquiry,
      freezeAmount: ''
    });

    component.courtOrderFile = new File([''], 'order.pdf');
    component.aadhaarCopyFile = new File([''], 'aadhaar.jpg');
    component.panCopyFile = new File([''], 'pan.jpg');

    const mockResponse = { caseNumber: 'CCMS-123', status: 'Pending' };
    courtServiceSpy.createCase.mockReturnValue(of(mockResponse));

    component.onSubmit();

    expect(component.isSubmitting).toBe(false);
    expect(component.successResponse).toEqual(mockResponse);
    expect(courtServiceSpy.createCase).toHaveBeenCalled();
  });

  it('should handle API error on submit', () => {
    component.caseForm.setValue({
      complainantName: 'John Doe',
      defendantName: 'Jane Doe',
      aadhaarNumber: '123456789012',
      panNumber: 'ABCDE1234F',
      accountNumber: '1234567890',
      bankName: 'Test Bank',
      orderType: OrderType.BalanceEnquiry,
      freezeAmount: ''
    });

    component.courtOrderFile = new File([''], 'order.pdf');
    component.aadhaarCopyFile = new File([''], 'aadhaar.jpg');
    component.panCopyFile = new File([''], 'pan.jpg');

    courtServiceSpy.createCase.mockReturnValue(throwError(() => ({ error: { message: 'Server failed' } })));

    component.onSubmit();

    expect(component.isSubmitting).toBe(false);
    expect(component.successResponse).toBeNull();
    expect(component.errorMessage).toBe('Server failed');
  });
});
