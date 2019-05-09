import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '@app/core';
import { AlertsService } from '@app/core/alerts.service';
import { User } from '@app/core/models/user/user';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-profile-notifications',
  templateUrl: './profile-notifications.component.html',
  styleUrls: ['./profile-notifications.component.scss']
})
export class ProfileNotificationsComponent implements OnInit {
  user: User;
  notificationsSettingsForm: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ currentUser }) => {
      this.user = currentUser;

      const poPiNotifications =
        !this.user.notifications ||
        (this.user.notifications.includes('order') && this.user.notifications.includes('invoice'));
      const documentsNotifications =
        !this.user.notifications ||
        (this.user.notifications.includes('document') && this.user.notifications.includes('contract'));

      this.notificationsSettingsForm = this.formBuilder.group({
        poPi: [poPiNotifications.toString()],
        documents: [documentsNotifications.toString()]
      });
    });
  }

  get poPiNotification() {
    return this.notificationsSettingsForm.value.poPi;
  }

  get documentNotification() {
    return this.notificationsSettingsForm.value.documents;
  }

  onSubmit() {
    const poPiNotification = this.notificationsSettingsForm.value.poPi;
    const documentNotification = this.notificationsSettingsForm.value.documents;

    const notifications = [];

    if (poPiNotification === 'true') {
      notifications.push('order');
      notifications.push('invoice');
    }

    if (documentNotification === 'true') {
      notifications.push('document');
      notifications.push('contract');
    }

    this.userService.updateNotifications(this.user._id, notifications).subscribe(
      () => {
        this.alerts.showAlert('Your notifications settings have been updated!');
      },
      err => {
        $.notify(
          {
            icon: 'notifications',
            message: err.error.message
          },
          {
            type: 'danger',
            timer: 5000,
            placement: {
              from: 'top',
              align: 'right'
            },
            offset: 78
          }
        );
      }
    );
  }
}
