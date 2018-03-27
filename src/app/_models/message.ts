import { User } from './../auth/_models/user';

export class Message {
  message: string;
  to: User;
  from: User;
  sentAt: number;
  read: boolean;

  constructor() {
    this.message = '';
    this.sentAt = Date.now();
    this.read = false;
  }
}
