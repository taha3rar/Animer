import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SellerQuoteRequest } from '@app/core/models/quote-request/seller-quoteRequest';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Injectable()
export class QuoteRequestDataService {
  quoteRequest = new BehaviorSubject(<QuoteRequest>new QuoteRequest());
  currentQuoteRequest = this.quoteRequest.asObservable();

  constructor() {}

  setQuoteRequest(quoteRequest: QuoteRequest) {
    this.quoteRequest.next(quoteRequest);
  }
}
