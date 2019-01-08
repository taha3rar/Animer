import { User } from '@app/core/models/order/user';
import { ActivatedRoute } from '@angular/router';
import { QuoteRequest } from '@app/core/models/transaction/qr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-quote-request',
  templateUrl: './transaction-quote-request.component.html',
  styleUrls: ['./transaction-quote-request.component.scss']
})
export class TransactionQuoteRequestComponent implements OnInit {

  quoteRequest: QuoteRequest = new QuoteRequest();
  buyer: User = new User();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
  }
}
