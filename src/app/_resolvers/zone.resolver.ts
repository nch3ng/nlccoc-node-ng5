import { ZoneService } from './../_services/zone.service';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Zone } from './../_models/income';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class ZoneResolver implements Resolve<Zone []> {
  constructor(
    private _zoneService: ZoneService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Zone []> | Promise<Zone []> | Zone [] {
    return this._zoneService.all();
  }
}
