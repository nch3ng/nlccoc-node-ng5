import { Zone } from './../_models/income';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../auth/_services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ZoneService {
  constructor(
    private _authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  all() {
    console.log('get all zones');
    return this.httpClient.get<Zone []>('/api/zones', this._authService.jwtHttpClient());
  }
}
