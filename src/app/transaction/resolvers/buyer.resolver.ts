import { UserService } from './../../core/api/user.service';
import { Injectable } from '@angular/core';
import { TransactionService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';

@Injectable()
export class BuyerResolver implements Resolve<Transaction> {
  buyerId: string;
  constructor(private transactionService: TransactionService, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Transaction> {
    const transactionId = route.params['id'];

    this.transactionService.get(transactionId).subscribe(data => {
      this.buyerId = data.created_by._id;
    });

    return this.userService.get(this.buyerId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
