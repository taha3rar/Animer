import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';
import { InvoiceService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InvoiceResolver implements Resolve<Invoice> {
  constructor(private invoiceService: InvoiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
    return this.invoiceService.get(route.params['id']).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
      })
    );
  }
}
