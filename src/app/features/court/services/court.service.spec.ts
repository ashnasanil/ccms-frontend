import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourtService } from './court.service';
import { CourtDashboard } from '../models/court-dashboard.model';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('CourtService', () => {
  let service: CourtService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourtService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourtService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch dashboard data', () => {
    const mockData: CourtDashboard = {
      totalCases: 10,
      pendingCases: 2,
      accountValidatedCases: 3,
      accountNotFoundCases: 1,
      freezeAppliedCases: 2,
      balanceProvidedCases: 2
    };

    service.getDashboard().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/court/dashboard');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
