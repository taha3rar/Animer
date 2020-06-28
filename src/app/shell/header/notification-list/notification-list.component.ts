import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ notifications }) => {
      this.notifications = notifications;
    });
  }

  get unreadNotificationsAmount() {
    // if (this.notifications) {
    //   return this.notifications.filter(n => !n.read).length;
    // }

    return 0;
  }

  profilePicture(notification: Notification) {
    // return notification.emitter.profile_picture || defaultValues.profile_picture;
    return '';
  }

  open(notification: Notification) {
    // this.service.markAsRead(notification._id).subscribe();
    // this.router.navigate([this.service.getUrl(notification) || this.router.url]);
  }
}
