import { User } from './../../src/app/auth/_models/user';
export class MessageModel {
  message: string;
  to: User;
  from: User;
  sentAt: number;
  read: boolean;

  constructor(...args) {
    if (!args[0]) {
      this.message = '';
      this.sentAt = Date.now();
      this.read = false;
    } else {
      this.message = args[0].message;
      this.sentAt = Date.now();
      this.from = args[0].from;
      this.to = args[0].to;
      this.read = false;
    }
  }
}
