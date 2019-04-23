import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@app/core/logger.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { OrderService } from '@app/core/api/order.service';
import { Order } from '@app/core/models/order/order';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const log = new Logger('OrderGuard');

@Injectable()
export class OrderGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private orderService: OrderService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const userId = this.authenticationService.currentUserId;

    return this.orderService.get(route.params.id).pipe(
      map((order: Order) => {
        if (this.authenticationService.isSeller) {
          if (userId === order.seller._id) {
            return true;
          } else {
            this.router.navigate(['/not-found']);
            return false;
          }
        } else if (this.authenticationService.isBuyer) {
          if (userId === order.buyer._id) {
            return true;
          } else {
            this.router.navigate(['/not-found']);
            return false;
          }
          // TO IMPROVE
        } else if (this.authenticationService.isAgribusiness) {
          if (userId === order.buyer._id || userId === order.seller._id) {
            return true;
          } else {
            this.router.navigate(['/not-found']);
            return false;
          }
        }
      }),
      catchError(err => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
