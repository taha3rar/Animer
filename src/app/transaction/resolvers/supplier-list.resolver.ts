import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService, AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class UserSupplierListResolver implements Resolve<Client[]> {
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
