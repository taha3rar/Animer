import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuoteRequestService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Injectable()
export class QuoteRequestResolver implements Resolve<QuoteRequest> {
  constructor(private quoteRequestService: QuoteRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<QuoteRequest> {
    return this.quoteRequestService.get(route.params['id']).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
      })
    );
  }
}
