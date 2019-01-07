import { QuoteRequest } from '@app/core/models/transaction/qr';
import { Injectable } from '@angular/core';
import { QrService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class QuoteRequestResolver implements Resolve<QuoteRequest[]> {
  constructor(private quoteRequestService: QrService) {}

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
