import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  page = 1;
  itemsPerPage = 16;
  notifications: Notification[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ notifications }) => {
      this.notifications = notifications;
    });
  }

  profilePicture(notification: Notification) {
    return '';
    // return notification.emitter.profile_picture || defaultValues.profile_picture;
  }

  clearNotification(id: string) {
    // this.service.delete(id).subscribe(
    //   () => {
    //     this.router.navigate([this.router.url]);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  open(notification: Notification) {
    // this.service.markAsRead(notification._id).subscribe();
    // this.router.navigate([this.service.getUrl(notification) || this.router.url]);
  }
}
