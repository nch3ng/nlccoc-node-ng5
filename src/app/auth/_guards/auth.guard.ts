import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService, private _route: ActivatedRoute) {
  }

  private getUrlParameter(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this._userService.verify().map(
      data => {
        if (data !== null) {
          console.log(data)
          let checked = this.getUrlParameter(state.url, "checked")
          if(data['verified'] !==null && data['verified'] == false && !checked){
            // Unverified
            console.log('redirect')
            this._router.navigate(['/' + currentUser['_id'] + '/unverified'], { queryParams: { checked: 1 } });
            return false;
          }
          // logged in so return true
          console.log('return true');
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
