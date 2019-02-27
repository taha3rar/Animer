import { Injectable } from '@angular/core';
import { AuthenticationService, OrderService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Order } from '@app/core/models/order/order';

@Injectable()
export class OrderListAsBuyerResolver implements Resolve<Order[]> {
  constructor(private authService: AuthenticationService, private orderService: OrderService) {}

  resolve(): Observable<Order[]> {
    const currentUserId = this.authService.currentUserId;

    return this.orderService.getByUserAsBuyer(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
