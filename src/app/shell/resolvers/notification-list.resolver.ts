import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class NotificationListResolver implements Resolve<Notification[]> {
  constructor(private authService: AuthenticationService) {}

  resolve(): Observable<Notification[]> {
    // const currentUserId = this.authService.currentUserId;

    // return this.notificationService.getByUser(currentUserId).pipe(
    //   map((notifications: Notification[]) => {
    //     const countToShow = 4;
    //     return notifications.slice(0, countToShow);
    //   }),
    //   catchError(err => {
    //     console.error(err);
    //     return EMPTY.pipe();
    //   })
    // );
    return EMPTY.pipe();

  }
}
