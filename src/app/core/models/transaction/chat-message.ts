import { User } from './../order/user';

export class Message {
  message: String;
  timestamp: string;
  user: User;

  constructor(message: String, user: User) {
    this.message = message;
    this.user = user;
  }
}
