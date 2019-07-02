import { Injectable } from '@angular/core';
import { AuthenticationService, QuoteRequestService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Injectable()
export class QuoteRequestListResolver implements Resolve<QuoteRequest[]> {
  constructor(private authService: AuthenticationService, private quoteRequestService: QuoteRequestService) {}

  resolve(): Observable<QuoteRequest[]> {
    const currentUserId = this.authService.currentUserId;

    return this.quoteRequestService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
