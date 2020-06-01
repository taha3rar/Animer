import { ActivatedRoute } from '@angular/router';
import { SdkService } from '@app/core/sdk.service';
import { countries } from '@app/shared/helpers/countries';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import * as libphonenumber from 'google-libphonenumber';
import { ResetPasswordDTO } from '@avenews/agt-sdk';
declare const $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // resetLinkStatus indicates the status of the reset link button
  // 0   -->  not clicked
  // 1   -->  reset link successfully sent
  // 2   -->  reset link failed to send
  resetLinkStatus = 0;
  username: string;
  forgotPasswordForm: FormGroup;
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  methodName: string;
  partialPhoneNumber: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private sdkService: SdkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KE';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.forgotPasswordForm.get('email').valueChanges.subscribe(email => {
      if (email) {
        this.forgotPasswordForm.get('phone').setValue('', { emitEvent: false });
        this.forgotPasswordForm.get('phone').setValidators([]);
        this.forgotPasswordForm.get('email').setValidators([Validators.required, Validators.email]);
      }
    });

    this.forgotPasswordForm.get('phone').valueChanges.subscribe(phone => {
      if (phone) {
        this.forgotPasswordForm.get('email').setValue('', { emitEvent: false });
        this.forgotPasswordForm.get('email').setValidators([]);
        this.forgotPasswordForm.get('phone').setValidators([Validators.required]);
      }
    });

    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }

  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phone;
    try {
      phone = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      phone = undefined;
      return;
    }
    this.forgotPasswordForm.patchValue({ phone: this.phoneUtil.format(phone, PNF.E164) });
  }

  recoverPassword() {
    // if (this.forgotPasswordForm.valid) {
    //   this.username = this.forgotPasswordForm.value.email || this.forgotPasswordForm.value.phone;
    //   this.sdkService.sendResetLink().subscribe(() => {
    //     this.resetLinkStatus = 1
    //   },
    //     err => {
    //       console.log(err);
    //       this.resetLinkStatus = 2
    //     });
    // when sdk ready will be uncommented
    // }
    // this.checkMethod();
  }

  generateLink(code: any, country: any) {
    return `<img src='../../assets/img/flags/${code}.png' height='19' height='27'><span>\xa0\xa0${country}</span>`;
  }

  checkMethod() {
    if (this.forgotPasswordForm.value.email) {
      this.methodName = 'email';
    } else {
      this.methodName = 'phone';
    }
  }
}
