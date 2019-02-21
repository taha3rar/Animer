import { JwtService } from './../authentication/jwt.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChatService {
  private socket: any = null;

  constructor(private jwtService: JwtService) {
    this.socket = io(environment.chat_url, { transports: ['websocket'], forceNew: true });
  }

  public initializeSocket() {
    this.socket = io(environment.chat_url, { transports: ['websocket'], forceNew: true });
  }

  public sendChatId(idChat: any) {
    const userToken = this.jwtService.credentials.user.token;
    this.socket.emit('id-chat', { idChat, userToken });
  }

  public sendMessage(message: any) {
    this.socket.emit('new-message', message);
  }

  public getInitialMessages = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer: any) => {
      this.socket.on('initial-message', (initialMsg: any) => {
        observer.next(initialMsg);
      });
    });
  }

  public getMessages = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer: any) => {
      this.socket.on('new-message', (message: any) => {
        observer.next(message);
      });
    });
  }

  public disconnect(reason: any) {
    console.log('closed in the chat : ' + reason);
    this.socket.emit('kill-connection', reason);
  }
}
