import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailComponent } from './case-detail.component';
import { CourtService } from '../../services/court.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CaseDetail } from '../../models/case-detail.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideRouter } from '@angular/router';

describe('CaseDetailComponent', () => {
  let component: CaseDetailComponent;
  let fixture: ComponentFixture<CaseDetailComponent>;
  let courtServiceSpy: { getCaseById: ReturnType<typeof vi.fn> };

  const mockCaseDetail: CaseDetail = {
    caseNumber: 'CCMS-001',
    complainantName: 'John Doe',
    defendantName: 'Jane Smith',
    aadhaarNumber: 'XXXX-XXXX-1234',
    panNumber: 'XXXXX1234X',
    accountNumber: 'XXXXXXXX890',
    bankName: 'State Bank',
    orderType: 'FreezeAccount',
    freezeAmount: 50000,
    status: 'Pending',
    createdDate: '2026-06-13',
    documents: ['order.pdf', 'pan.jpg'],
    bankResponse: null
  };

  beforeEach(async () => {
    courtServiceSpy = {
      getCaseById: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CaseDetailComponent],
      providers: [
        provideRouter([]),
        { provide: CourtService, useValue: courtServiceSpy },
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => 'CCMS-001' } } } 
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    courtServiceSpy.getCaseById.mockReturnValue(of(mockCaseDetail));
    fixture = TestBed.createComponent(CaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and fetch case details on init', () => {
    expect(component).toBeTruthy();
    expect(courtServiceSpy.getCaseById).toHaveBeenCalledWith('CCMS-001');
    expect(component.caseDetail).toEqual(mockCaseDetail);
    expect(component.isLoading).toBe(false);
  });

  it('should handle API errors', () => {
    courtServiceSpy.getCaseById.mockReturnValue(throwError(() => new Error('Not found')));
    component.ngOnInit(); // trigger again
    
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('Could not retrieve case details. It may not exist.');
  });
});
