import { Injectable } from '@angular/core';
import { TransactionService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';

@Injectable()
export class TransactionResolver implements Resolve<Transaction> {
  buyerId: string;
  constructor(private transactionService: TransactionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const transactionId = route.params['id'];
    return this.transactionService.get(transactionId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
