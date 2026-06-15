import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseListComponent } from './case-list.component';
import { CourtService } from '../../services/court.service';
import { of, throwError } from 'rxjs';
import { CaseList } from '../../models/case-list.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideRouter } from '@angular/router';

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let courtServiceSpy: { getCases: ReturnType<typeof vi.fn> };

  const mockCases: CaseList[] = [
    { caseNumber: 'CCMS-002', defendantName: 'Alice', orderType: 'BalanceEnquiry', status: 'Completed', createdDate: '2026-06-12' },
    { caseNumber: 'CCMS-001', defendantName: 'Bob', orderType: 'FreezeAccount', status: 'Pending', createdDate: '2026-06-11' },
    { caseNumber: 'CCMS-003', defendantName: 'Charlie', orderType: 'FreezeAccount', status: 'Pending', createdDate: '2026-06-13' }
  ];

  beforeEach(async () => {
    courtServiceSpy = {
      getCases: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CaseListComponent],
      providers: [
        provideRouter([]),
        { provide: CourtService, useValue: courtServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    courtServiceSpy.getCases.mockReturnValue(of(mockCases));
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should load cases on init', () => {
    expect(component.allCases.length).toBe(3);
    expect(component.filteredCases.length).toBe(3);
    expect(component.isLoading).toBe(false);
  });

  it('should filter cases based on search term', () => {
    component.searchControl.setValue('alice');
    expect(component.filteredCases.length).toBe(1);
    expect(component.filteredCases[0].caseNumber).toBe('CCMS-002');
  });

  it('should sort cases dynamically', () => {
    // Click sort on caseNumber
    component.sortBy('caseNumber');
    expect(component.filteredCases[0].caseNumber).toBe('CCMS-001'); // Ascending
    
    // Click sort again on caseNumber
    component.sortBy('caseNumber');
    expect(component.filteredCases[0].caseNumber).toBe('CCMS-003'); // Descending
  });

  it('should paginate correctly', () => {
    // Generate 15 items
    const largeMock = Array.from({ length: 15 }).map((_, i) => ({
      caseNumber: `CCMS-${i}`, defendantName: 'Dev', orderType: 'Freeze', status: 'Pending', createdDate: '2026-06-13'
    }));
    component.allCases = largeMock;
    component.applyFilterAndSort(''); // Refresh

    expect(component.totalPages).toBe(2);
    expect(component.paginatedCases.length).toBe(10); // Page 1 has 10
    
    component.changePage(2);
    expect(component.paginatedCases.length).toBe(5); // Page 2 has 5
  });

  it('should handle API errors gracefully', () => {
    courtServiceSpy.getCases.mockReturnValue(throwError(() => new Error('API Error')));
    component.loadCases();
    
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('Failed to load case list.');
  });
});
