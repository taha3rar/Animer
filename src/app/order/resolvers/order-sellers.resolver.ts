import { Injectable } from '@angular/core';
import { AuthenticationService, UserService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class OrderSellersResolver implements Resolve<Client[]> {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  resolve(): Observable<Client[]> {
    const currentUserId = this.authService.currentUserId;

    return this.userService.getSuppliersByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
