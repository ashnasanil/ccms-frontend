import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourtDashboard } from '../models/court-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private http = inject(HttpClient);
  
  // Assuming a relative path mapping to the backend via proxy or identical domain
  private apiUrl = '/api/court';

  getDashboard(): Observable<CourtDashboard> {
    return this.http.get<CourtDashboard>(`${this.apiUrl}/dashboard`);
  }
}
