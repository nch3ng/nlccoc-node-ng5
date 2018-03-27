import { HttpClient } from '@angular/common/http';
import { Message } from './../_models/message';
import { AuthenticationService } from './../auth/_services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  constructor(
    private _authService: AuthenticationService,
    private httpClient: HttpClient) {
  }

  create(msg: Message) {
    return this.httpClient.post('/api/messages', msg, this._authService.jwtHttpClient());
  }

  createForAll(msg: Message) {
    return this.httpClient.post('/api/messages/all', msg, this._authService.jwtHttpClient());
  }

  sendAlert(message: string) {
    const msg: Message = {
      message: message,
      from: null,
      to: null,
      sentAt: Date.now(),
      read: false
    };
    return this.createForAll(msg);
  }

  delete(id: number) {
    return this.httpClient.delete('/api/messages/' + id, this._authService.jwtHttpClient());
  }

  read(id: number) {
    return this.httpClient.post('/api/messages/' + id + '/read', this._authService.jwtHttpClient());
  }
}
