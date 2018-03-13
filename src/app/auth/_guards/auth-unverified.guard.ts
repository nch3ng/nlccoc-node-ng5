import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../_services/user.service';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthUnverifiedGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService, private _route: ActivatedRoute) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true;
  }
}