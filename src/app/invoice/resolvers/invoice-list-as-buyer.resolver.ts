import { Injectable } from '@angular/core';
import { AuthenticationService, InvoiceService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';

@Injectable()
export class InvoiceListAsBuyerResolver implements Resolve<Invoice[]> {
  constructor(private authService: AuthenticationService, private invoiceService: InvoiceService) {}

  resolve(): Observable<Invoice[]> {
    const currentUserId = this.authService.currentUserId;

    return this.invoiceService.getByUserAsBuyer(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
