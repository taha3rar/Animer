import { UserService } from '@app/core/api/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import { AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { OAuthLoginContext } from '@app/core/models/user/login-models';
import { Intercom } from 'ng-intercom';
import { User } from '@avenews/agt-sdk';

const log = new Logger('Login');
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  closeResult: string;
  forgotPassword = false;
  userValidated = false;
  countries = countries;
  filledPhoneEmail = false;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  partialPhoneNumber: string;
  phoneNumber: string;
  network: string;
  @ViewChild('email') email: ElementRef;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private socialAuthentificationService: SocialAuthService,
    public intercom: Intercom
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KE';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);

    if (this.route.snapshot.params.id) {
      this.userValidated = true;
      const id = this.route.snapshot.params.id;
      this.userService.updateUserValidation(id).subscribe(
        data => {
          const validatedUser = JSON.parse(data);
          this.intercomLogin(validatedUser, false);
        },
        err => {
          console.log(err);
        }
      );
    }

    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }

  generateLink(code: any, country: any) {
    return `<img src='../../assets/img/flags/${code}.png' height='19' height='27'><span>\xa0\xa0${country}</span>`;
  }

  async login() {
    this.isLoading = true;
    this.error = '';

    this.authenticationService
      .login(this.loginForm.value)
      .then(credentials => {
        this.loginForm.markAsPristine();
        this.isLoading = false;

        log.debug(`${credentials.user.username} successfully logged in`);
        this.intercomLogin(credentials.user, true);
        this.route.queryParams.subscribe(params =>
          this.router.navigate([params.redirect || '/'], { replaceUrl: true })
        );
      })
      .catch(error => {
        if (this.filledPhoneEmail) {
          this.loginForm.controls.username.setValue(this.phoneNumber);
          this.filledPhoneEmail = false;
          this.login();
        } else {
          this.isLoading = false;
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      });
  }

  onSubmit() {
    this.filledPhoneEmail = false;
    if (this.email.nativeElement.value && this.phoneNumber === undefined) {
      this.loginForm.controls.username.setValue(this.email.nativeElement.value);
    } else if (this.phoneNumber !== undefined && this.email.nativeElement.value === '') {
      this.loginForm.controls.username.setValue(this.phoneNumber);
    } else if (this.phoneNumber !== undefined && this.email.nativeElement.value !== '') {
      this.loginForm.controls.username.setValue(this.email.nativeElement.value);
      this.filledPhoneEmail = true;
    }
  }
  // Method to sign in with social networks.
  signIn(network: string): void {
    this.network = network;
    let platform: string;
    this.isLoading = true;
    if (network === 'facebook') {
      platform = FacebookLoginProvider.PROVIDER_ID;
    }
    if (network === 'google') {
      platform = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthentificationService.signIn(platform).then(
      response => {
        const context: OAuthLoginContext = {
          email: response.email,
          personal_network_id: response.id,
          access_token: response.authToken
        };
        this.error = '';
        this.authenticationService
          .oAuthLogin(context, network)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe(
            credentials => {
              log.debug(`${credentials.user.username} successfully logged in`);
              this.intercomLogin(credentials.user, true);
              this.route.queryParams.subscribe(params =>
                this.router.navigate([params.redirect || '/'], { replaceUrl: true })
              );
              this.user = response;
            },
            error => {
              $.notify(
                {
                  icon: 'notifications',
                  message: 'Please, sign up before signing in'
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
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  changeCard() {
    this.forgotPassword = true;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.phoneNumber = undefined;
      return;
    }
    this.phoneNumber = this.phoneUtil.format(phoneNumber, PNF.E164);
  }

  changeDiv(showDiv: string) {
    $('#loginType').css({ display: 'none' });
    $('#standardLogin').css({ display: 'none' });
    $('#' + showDiv).css({ display: 'block' });
  }

  intercomLogin(user: User, logged_in: boolean) {
    this.intercom.update({
      app_id: environment.intercom.app_id,
      name: user.personalInformation.firstName + ' ' + user.personalInformation.lastName,
      email: user.personalInformation.email,
      phone: user.personalInformation.phoneNumber,
      user_id: user._id,
      role: user.roles[0],
      validated: true,
      logged_in: logged_in,
      widget: {
        activator: '#intercom'
      }
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['', Validators.required],
      remember: true
    });
  }
}
