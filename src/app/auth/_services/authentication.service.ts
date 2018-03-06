import { Injectable } from "@angular/core";
import { 
  Http, 
  Response, 
  Headers, 
  RequestOptions  } from "@angular/http";
import "rxjs/add/operator/map";
import { User } from "../_models";

@Injectable()
export class AuthenticationService {
  private base_url = '/api';
  token: string;
  private _loggedIn: boolean = false;
  constructor(private http: Http) {
  }

  constructHeader(){
    let currUser = JSON.parse(localStorage.getItem('currentUser')); 
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    return new RequestOptions({ headers: headers });
  }

  fbLogin(user: User) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`/api/fbLogin`, body, options)
      .map((response: Response) => {
        let res_body = this.parseRes(response)
        if( res_body['success'] === true ){

          let user = res_body['user'];
          user.token = res_body['token'];

          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        }
      });
  }

  login(email: string, password: string) {
    let body = JSON.stringify({ email: email, password: password });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    //return this.http.post(`${this.base_url}/login`, body, options).map( (res) => this.setToken(res) );
    //return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
    
    return this.http.post(`${this.base_url}/login`, body, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let res_body = this.parseRes(response)
        if( res_body['success'] === true ){

          let user = res_body['user'];
          user.token = res_body['token'];

          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
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
    // this.router.navigate(["/"]);
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
}
