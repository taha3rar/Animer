import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService, AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/core/models/user/user';

@Injectable()
export class CurrentUserResolver implements Resolve<User> {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  resolve(): Observable<User> {
    const currentUserId = this.authService.currentUserId;

    return this.userService.get(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
