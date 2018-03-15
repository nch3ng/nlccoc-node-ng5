import { Avatar } from './../../../../server/interfaces/avatar';
import { AuthenticationService } from './authentication.service';
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../_models/authresponse';

@Injectable()
export class UserService {

  private base_url: '/api';
  private user: User;

  constructor(private http: Http, private authService: AuthenticationService, private httpClient: HttpClient) {
    this.user = new User();
  }

  verify() {
    return this.httpClient.get<AuthResponse>('/api/check-state', this.jwtHttpClient());
  }
  
  sendVerificationEmail(){
    return this.httpClient.post('/api/sendVerificationEmail', JSON.stringify(this.currentUser()),this.jwtHttpClient());
  }

  forgotPassword(email: string) {
    return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
  }

  getAll() {
    return this.httpClient.get<User []>('/api/users', this.jwtHttpClient());
  }

  getById(id: number) {
    return this.httpClient.get('/api/user/' + id, this.jwtHttpClient());
  }

  create(user: User) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/register', body, options);
    //return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    console.log("update");
    return this.httpClient.put('/api/user/' + user['_id'], user, this.jwtHttpClient());
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

  private jwtHttpClient(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new HttpHeaders({ 'x-access-token': currentUser.token });
      headers = headers.append('Content-Type', 'application/json');
      return { headers: headers };
    }
  }
}
