import { IncomeService } from './../_services/income.service';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IncomeType } from './../_models/income';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class IncomeTypeResolver implements Resolve<IncomeType []> {
  constructor(
    private _incomeService: IncomeService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IncomeType []> | Promise<IncomeType []> | IncomeType [] {
    return this._incomeService.types();
  }
}
