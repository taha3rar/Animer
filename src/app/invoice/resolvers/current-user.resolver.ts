import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService, AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/core/models/user/user';

@Injectable()
export class CurrentUserResolver implements Resolve<User> {
  constructor(private userService: UserService, private authService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = this.authService.currentUserId;
    return this.userService.get(userId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
