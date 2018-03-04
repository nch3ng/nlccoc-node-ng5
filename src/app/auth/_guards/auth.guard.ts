import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this._userService.verify().map(
      data => {
        if (data !== null) {
          console.log("success");
          // logged in so return true
          return true;
        }
        // error when verify so redirect to login page with the return url
        console.log("no data");
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      },
      error => {
        console.log("error");
        // error when verify so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }).catch(error => { 
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return Observable.throw(error) }
      );
  }
}
