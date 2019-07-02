import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuotationService, AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quotation } from '@app/core/models/quotation/quotation';

@Injectable()
export class QuotationSellerResolver implements Resolve<boolean | Quotation> {
  constructor(
    private quotationService: QuotationService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean | Quotation> {
    const currentUserId = this.authService.currentUserId;

    return this.quotationService.getByQuoteRequestSeller(route.params['id'], currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
      })
    );
  }
}
