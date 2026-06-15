import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CourtDashboard } from '../models/court-dashboard.model';
import { CreateCaseResponse } from '../models/create-case.model';
import { CaseList } from '../models/case-list.model';
import { CaseDetail } from '../models/case-detail.model';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/api/court`;

  getDashboard(): Observable<CourtDashboard> {
    return this.http.get<CourtDashboard>(`${this.apiUrl}/dashboard`);
  }

  createCase(formData: FormData): Observable<CreateCaseResponse> {
    return this.http.post<CreateCaseResponse>(`${this.apiUrl}/cases`, formData);
  }

  getCases(): Observable<CaseList[]> {
    return this.http.get<CaseList[]>(`${this.apiUrl}/cases`);
  }

  getCaseById(id: string): Observable<CaseDetail> {
    return this.http.get<CaseDetail>(`${this.apiUrl}/cases/${id}`);
  }
}
