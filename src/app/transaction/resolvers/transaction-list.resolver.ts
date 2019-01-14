import { Injectable } from '@angular/core';
import { AuthenticationService, TransactionService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';

@Injectable()
export class TransactionListResolver implements Resolve<Transaction[]> {
  constructor(private authService: AuthenticationService, private transactionService: TransactionService) {}

  resolve(): Observable<Transaction[]> {
    const currentUserId = this.authService.currentUserId;

    return this.transactionService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
