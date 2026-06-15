import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtDashboardComponent } from './court-dashboard.component';
import { CourtService } from '../../services/court.service';
import { of, throwError } from 'rxjs';
import { CourtDashboard } from '../../models/court-dashboard.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CourtDashboardComponent', () => {
  let component: CourtDashboardComponent;
  let fixture: ComponentFixture<CourtDashboardComponent>;
  let courtServiceSpy: { getDashboard: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    courtServiceSpy = {
      getDashboard: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CourtDashboardComponent],
      providers: [
        { provide: CourtService, useValue: courtServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    courtServiceSpy.getDashboard.mockReturnValue(of({
      totalCases: 0, pendingCases: 0, accountValidatedCases: 0,
      accountNotFoundCases: 0, freezeAppliedCases: 0, balanceProvidedCases: 0
    }));
    fixture = TestBed.createComponent(CourtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    const mockData: CourtDashboard = {
      totalCases: 5, pendingCases: 1, accountValidatedCases: 1,
      accountNotFoundCases: 1, freezeAppliedCases: 1, balanceProvidedCases: 1
    };
    courtServiceSpy.getDashboard.mockReturnValue(of(mockData));

    fixture = TestBed.createComponent(CourtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.dashboardData).toEqual(mockData);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when loading dashboard data', () => {
    courtServiceSpy.getDashboard.mockReturnValue(throwError(() => new Error('API Error')));

    fixture = TestBed.createComponent(CourtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.dashboardData).toBeNull();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('Failed to load dashboard data. Please try again later.');
  });
});
