import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '@app/core/api/user.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class UserClientListResolver implements Resolve<Client[]> {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  resolve(): Observable<Client[]> {
    const currentUserId = this.authService.currentUserId;

    return this.userService.getClientsByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
