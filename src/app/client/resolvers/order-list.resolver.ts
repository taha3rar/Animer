import { Injectable } from '@angular/core';
import { AuthenticationService, InvoiceService, OrderService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from '@app/core/models/order/order';

@Injectable()
export class OrderListResolver implements Resolve<Order[]> {
  constructor(private authService: AuthenticationService, private orderService: OrderService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {
    const currentUserId = this.authService.currentUserId;
    const clientId = route.params['id'];

    return this.orderService.getByUserIdAndClientId(currentUserId, clientId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
