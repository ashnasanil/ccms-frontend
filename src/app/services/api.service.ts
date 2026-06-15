import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  CaseListDto, 
  CaseDetailDto, 
  DashboardSummaryDto, 
  SubmitFreezeResponseCommand, 
  SubmitBalanceResponseCommand,
  BatchLogDto
} from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  // Dashboard
  getDashboardSummary(): Observable<DashboardSummaryDto> {
    return this.http.get<DashboardSummaryDto>(`${this.baseUrl}/bank/dashboard`);
  }

  // Cases
  getCasesByStatus(statusCategory: string): Observable<CaseListDto[]> {
    return this.http.get<CaseListDto[]>(`${this.baseUrl}/bank/cases`, {
      params: { statusCategory }
    });
  }

  getCaseDetail(id: string): Observable<CaseDetailDto> {
    return this.http.get<CaseDetailDto>(`${this.baseUrl}/bank/cases/${id}`);
  }

  // Responses
  submitFreezeResponse(id: string, command: SubmitFreezeResponseCommand): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/bank/cases/${id}/freeze`, command);
  }

  submitBalanceResponse(id: string, command: SubmitBalanceResponseCommand): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/bank/cases/${id}/balance`, command);
  }

  // Batch
  runBatch(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/batch/run`, {});
  }

  getBatchLogs(): Observable<BatchLogDto[]> {
    return this.http.get<BatchLogDto[]>(`${this.baseUrl}/batch/logs`);
  }
}
