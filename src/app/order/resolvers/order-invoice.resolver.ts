import { InvoiceService } from '@app/core/api/invoice.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Invoice } from '@app/core/models/invoice/invoice';

@Injectable()
export class OrderInvoiceResolver implements Resolve<Invoice> {
  invoice_id: string;
  constructor(private invoiceService: InvoiceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
    this.invoice_id = route.params['id'];
    return this.invoiceService.get(this.invoice_id).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
