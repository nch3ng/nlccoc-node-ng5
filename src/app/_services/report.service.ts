import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../auth/_services/authentication.service';
import { Injectable } from '@angular/core';
import { Report } from '../_models/report';

@Injectable()
export class ReportService {
  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient){}

  create(report: Report): Observable<Report> {
    return this.httpClient.post<Report>('/api/reports', report, this.authService.jwtHttpClient());
  }

  getAll(): Observable<Report []> {
    return this.httpClient.get<Report []>('/api/reports');
  }

  getById(id: any): Observable<Report> {
    return this.httpClient.get<Report>('/api/reports/'+id, this.authService.jwtHttpClient())
  }

  update(report: Report) {
    return this.httpClient.put<Report>('/api/reports/'+report['_id'], report, this.authService.jwtHttpClient())
  }

  delete(id: any) {
    return this.httpClient.delete('/api/reports/'+id, this.authService.jwtHttpClient())
  }
}