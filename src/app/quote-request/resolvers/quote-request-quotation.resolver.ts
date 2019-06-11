import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuoteRequestService, QuotationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';

@Injectable()
export class QuoteRequestQuotationsResolver implements Resolve<boolean | Quotation[]> {
  constructor(private quotationService: QuotationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean | Quotation[]> {
    return this.quotationService.getByQuoteRequest(route.params['id']).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
      })
    );
  }
}
