import { User } from './../../core/models/user/user';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-contact-transactions',
  templateUrl: './contact-transactions.component.html',
  styleUrls: ['./contact-transactions.component.scss']
})
export class ContactTransactionsComponent implements OnInit {
  @Input() user: User;

  constructor() {}
  ngOnInit() {}
}
