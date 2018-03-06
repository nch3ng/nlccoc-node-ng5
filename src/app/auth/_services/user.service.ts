import { Avatar } from './../../../../server/interfaces/avatar';
import { AuthenticationService } from './authentication.service';
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import 'rxjs';

@Injectable()
export class UserService {

  private base_url: '/api';
  private user: User;

  constructor(private http: Http, private authService: AuthenticationService) {
    this.user = new User();
  }

  verify() {
    return this.http.get('/api/check-state', this.jwt()).map((response: Response) => response.json());
  }

  forgotPassword(email: string) {
    return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    // console.log("Register: ");
    // console.log(user)
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/register', body, options);
    //return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  currentUser(): User {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser;

    return this.user;
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'x-access-token': currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
