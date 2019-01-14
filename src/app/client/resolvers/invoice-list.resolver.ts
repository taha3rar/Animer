import { Injectable } from '@angular/core';
import { AuthenticationService, InvoiceService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';

@Injectable()
export class InvoiceListResolver implements Resolve<Invoice[]> {
  constructor(private authService: AuthenticationService, private invoiceService: InvoiceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Invoice[]> {
    const currentUserId = this.authService.currentUserId;
    const clientId = route.params['id'];

    return this.invoiceService.getByUserIdAndClientId(currentUserId, clientId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
