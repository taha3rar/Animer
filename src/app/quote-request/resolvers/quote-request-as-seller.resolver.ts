import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Injectable } from '@angular/core';
import { AuthenticationService, QuoteRequestService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class QuoteRequestAsSeller implements Resolve<QuoteRequest[]> {
  constructor(private authService: AuthenticationService, private QRService: QuoteRequestService) {}

  resolve(): Observable<QuoteRequest[]> {
    const currentUserId = this.authService.currentUserId;

    return this.QRService.getByUserAsSeller(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
