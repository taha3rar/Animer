import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';

@Component({
  selector: 'app-client-transactions',
  templateUrl: './client-transactions.component.html',
  styleUrls: ['./client-transactions.component.scss']
})
export class ClientTransactionsComponent implements OnInit {
  @Input()
  transactions: Transaction[];
  page = 1;

  constructor() {}
  ngOnInit() {}
}
