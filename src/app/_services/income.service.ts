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
}
