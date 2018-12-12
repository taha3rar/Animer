import { Injectable } from '@angular/core';
import { AuthenticationService, OrderService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/core/models/user/user';
import { Resolve } from '@angular/router';

@Injectable()
export class OrderListResolver implements Resolve<User[]> {
  constructor(private authService: AuthenticationService, private orderService: OrderService) {}

  resolve(): Observable<User[]> {
    const currentUserId = this.authService.currentUserId;

    return this.orderService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
