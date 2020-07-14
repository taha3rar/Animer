import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { environment } from '@env/environment';
import { Intercom } from 'ng-intercom';
import { SocialNetworkName, SocialNetworkRegistrationDTO, User, AGTError, RegisterUserDTO } from '@avenews/agt-sdk';
import { SdkService } from '@app/core/sdk.service';

declare const $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends BaseValidationComponent implements OnInit {
  userRegistrationForm: FormGroup;
  countrySocialUser: string;
  businessNameSocialUser: string;
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  partialPhoneNumber: string;
  emailPhoneError = false;
  user: User;
  socialUser: SocialUser;
  canRegister = false;
  accessToken: string;
  isLoading = false;
  network: SocialNetworkName;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private socialAuthentificationService: SocialAuthService,
    private authenticationService: AuthenticationService,
    public intercom: Intercom,
    private sdkService: SdkService
  ) {
    super();
  }

  ngOnInit() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KE';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);

    this.userRegistrationForm = this.formBuilder.group(
      {
        firstName: [undefined, Validators.required],
        lastName: [undefined, Validators.required],
        email: [undefined, Validators.email],
        phoneNumber: [undefined],
        country: [undefined, Validators.required],
        password: [undefined, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [undefined, Validators.required],
        companyName: [undefined],
      },
      { validator: [this.equalPasswordsValidator, this.emailAndPhoneValidator] }
    );

    this.formInput = this.userRegistrationForm;

    setTimeout(function () {
      $('.selectpicker').selectpicker();
    }, 200);

    if (localStorage.getItem('networkToRegister')) {
      const network = localStorage.getItem('networkToRegister');
      localStorage.removeItem('networkToRegister');

      this.preSignUp(network as SocialNetworkName);
    }
  }

  // Method to sign in with facebook.
  preSignUp(network: SocialNetworkName): void {
    this.network = network;
    let platform: string;
    if (network === 'facebook') {
      platform = FacebookLoginProvider.PROVIDER_ID;
    }
    if (network === 'google') {
      platform = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthentificationService.signIn(platform).then((response: SocialUser) => {
      if (!response.email) {
        $.notify(
          {
            icon: 'notifications',
            message: 'Please, provide your email address',
          },
          {
            type: 'danger',
            timer: 5000,
            placement: {
              from: 'top',
              align: 'right',
            },
            offset: 20,
          }
        );
      } else {
        this.accessToken = response.authToken;
        this.socialUser = response;
        this.changeDiv('complement');
        setTimeout(function () {
          $('.selectpicker').selectpicker();
        }, 200);
      }
    });
  }

  oAuthSignUp() {
    this.isLoading = true;
    const socialuserInfo: SocialNetworkRegistrationDTO = {
      access_token: this.accessToken,
      country: this.countrySocialUser,
      businessName: this.businessNameSocialUser,
    };

    this.authenticationService
      .oAuthRegistration(socialuserInfo, this.network)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials) => {
          this.route.queryParams.subscribe((params) =>
            this.router.navigate([params.redirect || '/'], { replaceUrl: true })
          );
          this.intercomLogin(credentials.user, true);
        },
        (err: AGTError) => {
          this.isLoading = false;
          $.notify(
            {
              icon: 'notifications',
              message: err.message,
            },
            {
              type: 'danger',
              timer: 5000,
              placement: {
                from: 'top',
                align: 'right',
              },
              offset: 20,
            }
          );
        }
      );
  }

  equalPasswordsValidator(group: FormGroup) {
    if (group.value.confirmPassword !== group.value.password) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  emailAndPhoneValidator(group: FormGroup) {
    if (!group.value.phoneNumber && !group.value.email) {
      return { emailAndPhoneError: true };
    } else {
      return null;
    }
  }

  phoneValidator(phoneNumber: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!this.phoneUtil.isValidNumber(phoneNumber)) {
        return { phoneError: true };
      }
      return null;
    };
  }

  showEmailPhoneError() {
    return (
      this.userf.email.touched &&
      this.userf.phoneNumber.touched &&
      this.userRegistrationForm.hasError('emailAndPhoneError')
    );
  }

  generateLink(code: any, country: any) {
    return `<img src='../../assets/img/flags/${code}.png' height='19' height='27'><span>\xa0\xa0${country}</span>`;
  }

  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.userRegistrationForm.patchValue({ phoneNumber: undefined });
      return;
    }
    this.userRegistrationForm.patchValue({ phoneNumber: this.phoneUtil.format(phoneNumber, PNF.E164) });
    if (!this.phoneUtil.isValidNumber(phoneNumber)) {
      this.userf.phoneNumber.setErrors({ notValid: true });
    }
  }

  passwordsNotMatch() {
    return (
      this.userRegistrationForm.get('confirmPassword').touched &&
      this.userRegistrationForm.get('password').value !== this.userRegistrationForm.get('confirmPassword').value
    );
  }

  onGeneralSubmit() {
    const dto: RegisterUserDTO = {
      firstName: this.userf.firstName.value,
      lastName: this.userf.lastName.value,
      username: this.userf.email.value,
      country: this.userf.country.value,
      countryPhoneCode: '+' + this.phoneCode,
      password: this.userf.password.value,
      phoneNumber: this.userf.phoneNumber.value,
      countryPhoneCode: '',
      companyName: this.userf.companyName.value,
    };
    if (this.canRegister) {
      this.sdkService
        .register(dto)
        .then((user: User) => {
          if (user._id) {
            this.user = user;
            $('#standardRegistration').css({ display: 'none' });
            $('#confirmation').css({ display: 'flex' });
            this.intercomLogin(user, false);
          } else {
            return;
          }
        })
        .catch((err: AGTError) => {
          $.notify(
            {
              icon: 'notifications',
              message: err.message,
            },
            {
              type: 'danger',
              timer: 5000,
              placement: {
                from: 'top',
                align: 'right',
              },
              offset: 20,
            }
          );
        });
    } else {
      $('.captcha-error').show();
    }
  }
  captchaSubmit(e: any) {
    if (e) {
      this.canRegister = e;
      $('.captcha-error').hide();
    }
  }
  get userf() {
    return this.userRegistrationForm.controls;
  }

  changeDiv(showDiv: string) {
    $('#registrationType').css({ display: 'none' });
    $('#standardRegistration').css({ display: 'none' });
    $('#standardRegistration2').css({ display: 'none' });
    $('#complement').css({ display: 'none' });
    $('#confirmation').css({ display: 'none' });
    $('#' + showDiv).css({ display: 'block' });
  }

  intercomLogin(user: User, isOAuth: boolean) {
    this.intercom.update({
      app_id: environment.intercom.app_id,
      name: user.personalInformation.firstName + ' ' + user.personalInformation.lastName,
      email: user.personalInformation.email,
      phone: user.personalInformation.phoneNumber,
      user_id: user._id,
      role: user.roles[0],
      registered: true,
      validated: isOAuth,
      logged_in: isOAuth,
      widget: {
        activator: '#intercom',
      },
    });
  }
}
