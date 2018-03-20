import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../auth/_services/authentication.service';
import { Injectable } from '@angular/core';
import { Report } from '../_models/report';

@Injectable()
export class ReportService {
  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient){}

  create(report: Report) {
    return this.httpClient.post<Report>('/api/reports', report, this.authService.jwtHttpClient());
  }

  getAll() {
    return this.httpClient.get('/api/reports');
  }

  getById(id: number) {

  }

  update(report: Report) {

  }

  delete(id: number) {
    
  }
}