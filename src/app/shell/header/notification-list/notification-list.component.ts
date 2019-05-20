import { Component, OnInit } from '@angular/core';
import { Notification } from '@app/core/models/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@app/core/api/notification.service';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[];

  constructor(private route: ActivatedRoute, private service: NotificationService, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ notifications }) => {
      this.notifications = notifications;
      this.service.setLinks(this.notifications);
    });
  }

  get unreadNotificationsAmount() {
    if (this.notifications) {
      return this.notifications.filter(n => !n.read).length;
    }

    return 0;
  }

  profilePicture(notification: Notification) {
    return notification.emitter.profile_picture || defaultValues.profile_picture;
  }

  open(notification: Notification) {
    this.service.markAsRead(notification._id).subscribe();
    this.router.navigate([this.service.getUrl(notification) || this.router.url]);
  }
}
