import { SdkService } from '@app/core/sdk.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordByTokenDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordChanged = false;
  resetToken: string;
  passwordForm: FormGroup;
  constructor(
    private sdkService: SdkService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.resetToken = this.route.snapshot.params['token'];
    this.passwordForm = this.formBuilder.group(
      {
        newPassword: [undefined, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [undefined, [Validators.required, Validators.minLength(8)]]
      },
      { validator: this.equalPasswordsValidator }
    );
  }

  equalPasswordsValidator(group: FormGroup) {
    if (group.value.newPassword !== group.value.confirmPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  passwordsNotMatch() {
    return (
      this.passwordForm.invalid &&
      this.passwordForm.get('newPassword').dirty &&
      this.passwordForm.get('confirmPassword').dirty
    );
  }

  submit() {
    const reset: ResetPasswordByTokenDTO = {
      token: this.resetToken,
      newPwd: this.passwordForm.get('newPassword').value
    };
    this.sdkService.resetPasswordByToken(reset).then(data => {
      this.passwordChanged = true;
    });
  }
}
