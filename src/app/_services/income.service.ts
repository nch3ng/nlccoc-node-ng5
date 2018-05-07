import { IncomeType } from './../_models/income';
import { AuthenticationService } from './../auth/_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Income } from '../_models/income';

@Injectable()
export class IncomeService {
  constructor(
    private httpClient: HttpClient,
    private _authService: AuthenticationService) {}
  create(income: Income) {
    return this.httpClient.post('/api/income', income, this._authService.jwtHttpClient());
  }

  types() {
    return this.httpClient.get<IncomeType []>('/api/income/types', this._authService.jwtHttpClient());
  }

  all() {
    return this.httpClient.get<Income []>('/api/income');
  }
}
