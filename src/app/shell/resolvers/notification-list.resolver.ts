import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { NotificationService } from '@app/core/api/notification.service';
import { Notification } from '@app/core/models/notification';

@Injectable()
export class NotificationListResolver implements Resolve<Notification[]> {
  constructor(private authService: AuthenticationService, private notificationService: NotificationService) {}

  resolve(): Observable<Notification[]> {
    const currentUserId = this.authService.currentUserId;

    return this.notificationService.getByUser(currentUserId).pipe(
      map((notifications: Notification[]) => {
        const countToShow = 4;
        return notifications.slice(0, countToShow);
      }),
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
