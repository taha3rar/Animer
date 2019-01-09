import { User } from './../../core/models/order/user';
import { ChatService } from './../../core/api/chat.service';
import { AuthenticationService } from './../../core/authentication/authentication.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import * as moment from 'moment';
import { Message } from '@app/core/models/transaction/chat-message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tansaction-chat',
  templateUrl: 'transaction-chat.component.html',
  styleUrls: ['transaction-chat.component.scss']
})
export class TransactionChatComponent implements OnInit, OnChanges, OnDestroy {
  currentUser: any;
  chatUser: User;
  message: String;
  messages: Message[] = [];
  transaction: Transaction;

  @Input()
  transactionChat: Transaction;

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.transaction = this.route.snapshot.data['transaction'];
    this.chatService.initializeSocket();

    this.currentUser = this.authService.credentials.user;
  }

  sendMessage() {
    this.chatService.sendMessage(new Message(this.message, this.currentUser));
    this.message = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transactionChat = changes.transactionChat.currentValue;

    if (this.transactionChat) {
      this.chatService.sendChatId(this.transactionChat.chat_id);
    }

    this.chatService.getInitialMessages().subscribe((initialMsg: Message) => {
      if (this.currentUser._id !== initialMsg.user._id) {
        this.chatUser = initialMsg.user;
      }

      initialMsg.timestamp = moment(initialMsg.timestamp).calendar();
      this.messages.push(initialMsg);
    });

    this.chatService.getMessages().subscribe((newMessage: Message) => {
      if (this.currentUser._id !== newMessage.user._id) {
        this.chatUser = newMessage.user;
      }
      if (this.transactionChat.chat_id) {
        newMessage.timestamp = moment(newMessage.timestamp).calendar();
        this.messages.push(newMessage);
      }
    });
  }
  ngOnDestroy() {
    this.chatService.disconnect('Client left the transaction page');
    console.log('closed on destroy');
  }
}
