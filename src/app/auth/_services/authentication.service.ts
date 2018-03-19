import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { 
  Http, 
  Response, 
  Headers, 
  RequestOptions  } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";

import { User } from "../_models";
import { AuthResponse } from "../_models/authresponse";

@Injectable()
export class AuthenticationService {
  private base_url = '/api';
  token: string;
  private _loggedIn: boolean = false;
  constructor(private http: HttpClient) {
  }

  constructHeader(){
    let currUser = JSON.parse(localStorage.getItem('currentUser')); 
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    return { headers: headers };
  }

  fbLogin(user: User) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    let options = {
      headers: headers
    }
    return this.http.post<AuthResponse>(`/api/fbLogin`, body, options)
      .map((response) => {
        // console.log(response);
        if( response.success === true ){

          let user = response.user;
          user.token = response.token;
          delete user['salt'];
          delete user['hash'];
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        }
      });
  }

  login(email: string, password: string): any {
    let body = JSON.stringify({ email: email, password: password });
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let options = {
      headers: headers
    }

    return this.http.post<AuthResponse>(`${this.base_url}/login`, body, options)
      .map((response: AuthResponse) => {
        // login successful if there's a jwt token in the response
        if( response.success === true ){

          let user = response.user;

          user.token = response.token;
      
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            delete user['salt'];
            delete user['hash'];
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          // console.log(user);
          return user;
        }
        // let user = response.json();
        // if (user && user.token) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        // }
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    this._loggedIn=false;
    localStorage.removeItem('currentUser');
  }

  setToken(res){
    let body = JSON.parse(res['_body']);
    if( body['success'] == true ){
      this.token = body['token'];
      this._loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify({ 
        email: body['user']['email'], 
        token: this.token 
      }));
    }
    return body;
  }

  parseRes(res){
    let body = JSON.parse(res['_body']);
    return body;
  }

  get loggedIn() {
    return this._loggedIn;
  }

  verifyEmail(cid: string, uid: string): Observable<{success: boolean, message: string}>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{success: boolean, message: string}>('/api/confirmation/'+cid+'?uid='+uid, {}, { headers: headers })
  }

  jwtHttpClient(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new HttpHeaders({ 'x-access-token': currentUser.token });
      headers = headers.append('Content-Type', 'application/json');
      return { headers: headers };
    }
  }

}
