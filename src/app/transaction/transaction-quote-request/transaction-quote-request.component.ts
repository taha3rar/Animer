import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';

@Component({
  selector: 'app-transaction-quote-request',
  templateUrl: './transaction-quote-request.component.html',
  styleUrls: ['./transaction-quote-request.component.scss']
})
export class TransactionQuoteRequestComponent implements OnInit {
  @Input()
  quoteRequest: QuoteRequest;
  @Input()
  transaction: Transaction;

  constructor() {}

  ngOnInit() {}
}
