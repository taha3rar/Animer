import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService, AuthenticationService } from '@app/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import { UserRegistration } from '@app/core/models/user/user-registration';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider
} from 'angularx-social-login';
import { OAuthLoginContext } from '@app/core/models/user/login-models';
import { environment } from '@env/environment';
import { Intercom } from 'ng-intercom';

declare const $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseValidationComponent implements OnInit {
  userRegistrationForm: FormGroup;
  newUser: UserRegistration = new UserRegistration();
  userType = 'seller';
  countrySocialUser: string;
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  partialPhoneNumber: string;
  emailPhoneError = false;
  user: SocialUser;
  accessToken: string;
  isLoading = false;
  network: string;
  marketing_campaign = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private socialAuthentificationService: SocialAuthService,
    private authenticationService: AuthenticationService,
    public intercom: Intercom
  ) {
    super();
  }

  ngOnInit() {
    this.marketing_campaign = this.route.snapshot.queryParamMap.get('m') !== '1';
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
        companyName: [undefined]
      },
      { validator: [this.equalPasswordsValidator, this.emailAndPhoneValidator] }
    );

    this.formInput = this.userRegistrationForm;

    this.checkUrlUserType();

    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }

  // Method to sign in with facebook.
  preSignUp(network: string): void {
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
            message: 'Please, provide your email address'
          },
          {
            type: 'danger',
            timer: 5000,
            placement: {
              from: 'top',
              align: 'right'
            },
            offset: 20
          }
        );
      } else {
        this.accessToken = response.authToken;
        this.userType = undefined;
        this.changeDiv('complement');
        this.user = response;
        setTimeout(function() {
          $('.selectpicker').selectpicker();
        }, 200);
      }
    });
  }

  oAuthSignUp() {
    this.isLoading = true;
    const socialuserInfo = {
      access_token: this.accessToken,
      country: this.countrySocialUser,
      marketing_campaign: this.marketing_campaign,
      role: this.userType
    };
    this.userService.oAuthRegistration(socialuserInfo, this.network).subscribe(
      response => {
        const context: OAuthLoginContext = {
          email: response.email,
          personal_network_id: response[this.network][this.network + '_id'],
          access_token: this.accessToken
        };
        this.authenticationService
          .oAuthLogin(context, this.network)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe(credentials => {
            this.route.queryParams.subscribe(params =>
              this.router.navigate([params.redirect || '/'], { replaceUrl: true })
            );
            this.intercomLogin(credentials.user, true);
            this.user = response;
          });
      },
      err => {
        this.isLoading = false;
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
            offset: 20
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
      this.clientf.email.touched &&
      this.clientf.phoneNumber.touched &&
      this.userRegistrationForm.hasError('emailAndPhoneError')
    );
  }

  checkUrlUserType() {
    const userRole = this.route.snapshot.paramMap.get('userRole');
    if (userRole) {
      this.userType = userRole;
    } else {
      this.userType = 'seller';
    }
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
      this.clientf.phoneNumber.setErrors({ notValid: true });
    }
  }

  passwordsNotMatch() {
    return (
      this.userRegistrationForm.get('confirmPassword').touched &&
      this.userRegistrationForm.get('password').value !== this.userRegistrationForm.get('confirmPassword').value
    );
  }

  onGeneralSubmit() {
    this.newUser.first_name = this.clientf.firstName.value;
    this.newUser.last_name = this.clientf.lastName.value;
    this.newUser.email = this.clientf.email.value;
    this.newUser.country = this.clientf.country.value;
    this.newUser.password = this.clientf.password.value;
    this.newUser.phone_number = this.clientf.phoneNumber.value;
    this.newUser.role = this.userType;
    this.newUser.company_name = this.clientf.companyName.value;
    this.newUser.marketing_campaign = this.marketing_campaign;

    this.userService.saveNewUser(this.newUser).subscribe(
      data => {
        if (data._id) {
          $('#standardRegistration2').css({ display: 'none' });
          $('#confirmation').css({ display: 'flex' });
          this.intercomLogin(data, false);
        } else {
          return;
        }
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
            offset: 20
          }
        );
      }
    );
  }

  get clientf() {
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

  onActiveBtn(btnType: string) {
    this.userType = btnType;
  }

  intercomLogin(user: any, isOAuth: boolean) {
    this.intercom.update({
      app_id: environment.intercom.app_id,
      name: user.personal_information.first_name + ' ' + user.personal_information.last_name,
      email: user.email,
      phone: user.personal_information.phone_number,
      user_id: user._id,
      role: user.roles[0],
      client: user.roles.includes('client'),
      marketing_campaign: this.marketing_campaign,
      registered: true,
      validated: isOAuth,
      logged_in: isOAuth,
      widget: {
        activator: '#intercom'
      }
    });
  }
}
