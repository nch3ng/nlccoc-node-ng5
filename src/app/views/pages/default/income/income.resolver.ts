import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IncomeService } from './../../../../_services/income.service';
import { Income } from './../../../../_models/income';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class IncomeResolver implements Resolve<Income []> {
  constructor(
    private _incomeService: IncomeService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Income []> | Promise<Income []> | Income [] {
    return this._incomeService.all();
  }
}
