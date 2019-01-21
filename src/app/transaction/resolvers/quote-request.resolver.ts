import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { QuoteRequestService } from '@app/core';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';

@Injectable()
export class QuoteRequestResolver implements Resolve<QuoteRequest[]> {
  constructor(private quoteRequestService: QuoteRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<QuoteRequest[]> {
    const transactionId = route.params['id'];

    return this.quoteRequestService.getByTransaction(transactionId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
