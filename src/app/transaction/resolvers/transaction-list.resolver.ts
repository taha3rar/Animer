import { Injectable } from '@angular/core';
import { AuthenticationService, TransactionService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/core/models/user/user';
import { Resolve } from '@angular/router';

@Injectable()
export class TransactionListResolver implements Resolve<User[]> {
  constructor(private authService: AuthenticationService, private transactionService: TransactionService) {}

  resolve(): Observable<User[]> {
    const currentUserId = this.authService.currentUserId;

    return this.transactionService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
