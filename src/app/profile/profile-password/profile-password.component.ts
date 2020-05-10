import { SpinnerToggleService } from './../../shared/services/spinner-toggle.service';
import { AlertsService } from '@app/core/alerts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SdkService } from '@app/core/sdk.service';
import { AGTError, ChangePasswordDTO } from '@avenews/agt-sdk';

declare const $: any;

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alerts: AlertsService,
    private spinnerService: SpinnerToggleService,
    private sdkService: SdkService
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        current: ['', Validators.required],
        new: ['', Validators.required],
        repeatNew: ['', [Validators.required]]
      },
      { validator: this.equalPasswordsValidator }
    );
  }

  equalPasswordsValidator(group: FormGroup) {
    if (group.value.new !== group.value.repeatNew) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  passwordsNotMatch() {
    return (
      this.changePasswordForm.invalid &&
      this.changePasswordForm.get('repeatNew').touched &&
      this.changePasswordForm.get('new').touched
    );
  }

  onSubmitChangePassword() {
    if (this.changePasswordForm.valid) {
      this.spinnerService.showSpinner();
      const passwords: ChangePasswordDTO = {
        oldPwd: this.changePasswordForm.value.current,
        newPwd: this.changePasswordForm.value.new
      };

      this.sdkService
        .changePassword(passwords)
        .then(() => {
          this.spinnerService.hideSpinner();
          this.changePasswordForm.reset();
          this.alerts.showAlert('Your password has been updated!');
        })
        .catch((err: AGTError) => {
          $.notify(
            {
              icon: 'notifications',
              message: err.message
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
        });
    }
  }
}
