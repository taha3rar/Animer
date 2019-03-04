import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService, AuthenticationService } from '@app/core';
import { Passwords } from '@app/core/models/user/passwords';

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
    private userService: UserService,
    private authService: AuthenticationService
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
    // tslint:disable-next-line:max-line-length
    return (
      this.changePasswordForm.invalid &&
      this.changePasswordForm.get('repeatNew').touched &&
      this.changePasswordForm.get('new').touched
    );
  }

  onSubmitChangePassword() {
    if (this.changePasswordForm.valid) {
      const passwords = new Passwords();

      passwords.old_password = this.changePasswordForm.value.current;
      passwords.new_password = this.changePasswordForm.value.new;

      this.userService.changePassword(this.authService.currentUserId, passwords).subscribe(
        () => {
          this.changePasswordForm.reset();
          $.notify(
            {
              icon: 'notifications',
              message: 'Changes saved!'
            },
            {
              type: 'success',
              timer: 2000,
              placement: {
                from: 'top',
                align: 'right'
              },
              offset: 78
            }
          );
        },
        err => {
          $.notify(
            {
              icon: 'notifications',
              message: err.error.message
            },
            {
              type: 'danger',
              timer: 2000,
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
}
