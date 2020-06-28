import { SpinnerToggleService } from './../../shared/services/spinner-toggle.service';
import { Component, OnInit } from '@angular/core';
import { AlertsService } from '@app/core/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@avenews/agt-sdk';

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
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerToggleService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ currentUser }) => {
      this.user = currentUser;

      const poPiNotifications = false;
      // !this.user.notifications ||
      // (this.user.notifications.includes('order') && this.user.notifications.includes('invoice'));
      const documentsNotifications = false;
      // !this.user.notifications ||
      // (this.user.notifications.includes('document') && this.user.notifications.includes('contract'));
      const qrNotifications = false;
      // !this.user.notifications ||
      // (this.user.notifications.includes('quote-request') && this.user.notifications.includes('quotation'));

      this.notificationsSettingsForm = this.formBuilder.group({
        poPi: [poPiNotifications.toString()],
        documents: [documentsNotifications.toString()],
        qr: [qrNotifications.toString()]
      });
    });
  }

  get poPiNotification() {
    return this.notificationsSettingsForm.value.poPi;
  }

  get documentNotification() {
    return this.notificationsSettingsForm.value.documents;
  }

  get qrNotification() {
    return this.notificationsSettingsForm.value.qr;
  }

  onSubmit() {
    this.spinnerService.showSpinner();
    const poPiNotification = this.notificationsSettingsForm.value.poPi;
    const documentNotification = this.notificationsSettingsForm.value.documents;
    const qrNotification = this.notificationsSettingsForm.value.qr;

    const notifications = [];

    if (poPiNotification === 'true') {
      notifications.push('order');
      notifications.push('invoice');
    }

    if (documentNotification === 'true') {
      notifications.push('document');
      notifications.push('contract');
    }

    if (qrNotification === 'true') {
      notifications.push('quote-request');
      notifications.push('quotation');
    }

    // this.userService.updateNotifications(this.user._id, notifications).subscribe(
    //   () => {
    //     this.spinnerService.hideSpinner();
    //     this.alerts.showAlert('Your notifications settings have been updated!');
    //   },
    //   err => {
    //     $.notify(
    //       {
    //         icon: 'notifications',
    //         message: err.error.message
    //       },
    //       {
    //         type: 'danger',
    //         timer: 5000,
    //         placement: {
    //           from: 'top',
    //           align: 'right'
    //         },
    //         offset: 78
    //       }
    //     );
    //   }
    // );
  }
}
