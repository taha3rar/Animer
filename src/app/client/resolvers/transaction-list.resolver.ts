import { Injectable } from '@angular/core';
import { AuthenticationService, TransactionService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';

@Injectable()
export class TransactionListResolver implements Resolve<Transaction[]> {
  constructor(private authService: AuthenticationService, private transactionService: TransactionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Transaction[]> {
    const currentUserId = this.authService.currentUserId;
    const clientId = route.params['id'];

    return this.transactionService.getByUserIdAndClientId(currentUserId, clientId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
