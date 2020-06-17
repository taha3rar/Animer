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
    this.passwordForm = this.formBuilder.group({
      newPassword: [undefined, [Validators.required, Validators.minLength(8)]],
      confrimPassword: [undefined, [Validators.required, Validators.minLength(8)]]
    });
  }
  submit() {
    if (
      this.passwordForm.valid &&
      this.passwordForm.get('newPassword').value === this.passwordForm.get('confirmPassword').value
    ) {
      const reset: ResetPasswordByTokenDTO = {
        token: this.resetToken,
        newPwd: this.passwordForm.get('newPassword').value
      };
      // this.sdkService.resetPassword(reset).subscribe(data => {
      // ??
      // });
    }
  }
}
