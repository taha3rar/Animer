import { PurchaseOrder } from './../../core/models/transaction/po';
import { PurchaseOrderService } from './../../core/api/po.service';

import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PurchaseOrderResolver implements Resolve<PurchaseOrder> {
  constructor(private purchaseOrderService: PurchaseOrderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PurchaseOrder> {
    const transactionId = route.params['id'];

    return this.purchaseOrderService.getByTransaction(transactionId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
