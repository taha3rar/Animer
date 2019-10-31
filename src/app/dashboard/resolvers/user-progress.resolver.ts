import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService, AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserProgressResolver implements Resolve<any> {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  resolve(): Observable<any> {
    const currentUserId = this.authService.currentUserId;

    return this.userService.getUserProgress(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
