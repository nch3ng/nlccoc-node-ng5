import { Avatar } from './../../../../server/interfaces/avatar';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
// import 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../_models/authresponse';
import { Message } from '../../_models/message';

@Injectable()
export class UserService {

  private base_url: '/api';
  private user: User;

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) {
    this.user = new User();
  }

  verify(): any {
    return this.httpClient.get<AuthResponse>('/api/check-state', this.jwtHttpClient());
  }
  sendVerificationEmail(): any {
    return this.httpClient.post('/api/sendVerificationEmail', JSON.stringify(this.currentUser()), this.jwtHttpClient());
  }

  forgotPassword(email: string) {
    return this.httpClient.post('/api/forgot-password', JSON.stringify({ email }), this.jwtHttpClient());
  }

  approve(id: number) {
    return this.setRole(id, 'nlccoc');
  }

  getWaitingUsers() {
    return this.httpClient.get<User []>('/api/users/waitingForApproval', this.jwtHttpClient());
  }

  getAll() {
    return this.httpClient.get<User []>('/api/users', this.jwtHttpClient());
  }

  getById(id: number) {
    return this.httpClient.get<User>('/api/user/' + id, this.jwtHttpClient());
  }

  create(user: User) {
    return this.httpClient.post<User>('/api/register', user, this.jwtHttpClient());
  }

  update(user: User) {
    return this.httpClient.put<User>('/api/user/' + user['_id'], user, this.jwtHttpClient());
  }

  delete(id: number) {
    return this.httpClient.delete<User>('/api/user/' + id, this.jwtHttpClient());
  }

  currentUser(): User {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser;
    return this.user;
  }

  setRole(id: number, roleName: string) {
    const role = {
      name: roleName
    };
    return this.httpClient.put<User>('/api/user/' + id + '/setRole', role, this.jwtHttpClient());
  }

  submitNLCCOC(id: number) {
    return this.httpClient.post<User>('/api/user/' + id + '/submitNLCCOC', null, this.jwtHttpClient());
  }

  getMessages() {
    return this.httpClient.get<Message []>('/api/user/' + this.user['_id'] + '/messages', this.jwtHttpClient());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'x-access-token': currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

  private jwtHttpClient() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new HttpHeaders({ 'x-access-token': currentUser.token });
      headers = headers.append('Content-Type', 'application/json');
      return { headers: headers };
    }
  }
}
