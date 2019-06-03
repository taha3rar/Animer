import { Component, OnInit, Input } from '@angular/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { User } from '@app/core/models/order/user';

@Component({
  selector: 'app-quotation-quote-request',
  templateUrl: './quotation-quote-request.component.html',
  styleUrls: ['./quotation-quote-request.component.scss']
})
export class QuotationQuoteRequestComponent implements OnInit {
  @Input()
  quoteRequest: QuoteRequest;
  @Input()
  seller: User;

  constructor() {}

  ngOnInit() {}
}
