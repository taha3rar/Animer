import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class NotificationListResolver implements Resolve<Notification[]> {
  constructor(private authService: AuthenticationService) {}

  resolve(): Observable<Notification[]> {
    // const currentUserId = this.authService.currentUserId;
    return EMPTY.pipe();

    // return this.notificationService.getByUser(currentUserId).pipe(
    //   catchError(err => {
    //     console.error(err);
    //     return EMPTY.pipe();
    //   })
    // );
  }
}
