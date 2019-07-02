import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuotationService } from '@app/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quotation } from '@app/core/models/quotation/quotation';

@Injectable()
export class QuotationResolver implements Resolve<boolean | Quotation> {
  constructor(private quotationService: QuotationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean | Quotation> {
    return this.quotationService.get(route.params['id']).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
      })
    );
  }
}
