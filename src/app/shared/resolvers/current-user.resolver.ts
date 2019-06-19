import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '@app/core/api/user.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
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
