import { ProformaInvoiceService } from '@app/core';
import { ProformaInvoice } from '@app/core/models/transaction/pi';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ProformaInvoiceResolver implements Resolve<ProformaInvoice[]> {
  constructor(private proformaInvoiceService: ProformaInvoiceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProformaInvoice[]> {
    const transactionId = route.params['id'];

    return this.proformaInvoiceService.getByTransaction(transactionId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
