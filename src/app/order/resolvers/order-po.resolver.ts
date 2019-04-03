import { OrderService } from '@app/core/api/order.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '@app/core/models/order/order';

@Injectable()
export class OrderPoResolver implements Resolve<Order> {
  order_id: string;
  constructor(private orderService: OrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    this.order_id = route.params['id'];
    return this.orderService.get(this.order_id).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
        // return EMPTY.pipe();
      })
    );
  }
}
