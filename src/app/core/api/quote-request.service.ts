import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteRequestRecipients } from '../models/transaction/quote-request/quote-request-recipients';
import { QuoteRequest } from '../models/transaction/quote-request/quote-request';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService extends BaseService {
  constructor(protected apiService: ApiService, private transactionService: TransactionService) {
    super(apiService, '/quote-request');
  }

  getQuoteRequest(id: string): Observable<QuoteRequest> {
    return this.getByTransaction(id).pipe(map(data => data));
  }

  sendToRecipients(quoteRequest: QuoteRequest, recipients: QuoteRequestRecipients): void {
    if (recipients.suppliers.length) {
      for (const client of recipients.suppliers) {
        this.create(quoteRequest).subscribe(qr => {
          this.transactionService.setSeller(qr.transaction_id, client._id).subscribe();
        });
      }
    }

    if (recipients.ecosystems.length) {
      for (const ecosystem of recipients.ecosystems) {
        for (const participant of ecosystem.participants) {
          this.create(quoteRequest).subscribe(qr => {
            this.transactionService.setSeller(qr.transaction_id, participant._id).subscribe();
          });
        }
      }
    }

    if (recipients.avenews) {
      this.create(quoteRequest).subscribe();
    }

    // TODO: Decide what to return
  }
}
