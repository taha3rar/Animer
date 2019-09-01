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
  @ViewChild('email') email: ElementRef;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private socialAuthentificationService: SocialAuthService
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
        data => {},
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

  login() {
    this.isLoading = true;
    this.error = '';
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          console.log(credentials);
          log.debug(`${credentials.user.email} successfully logged in`);
          console.log('boot');
          (<any>window).Intercom('update', {
            app_id: 'zjpiv02o',
            name:
              credentials.user.personal_information.first_name + ' ' + credentials.user.personal_information.last_name,
            email: credentials.user.email,
            phone: credentials.user.personal_information.phone_number,
            user_id: credentials.user._id,
            role: credentials.user.roles[0],
            client: credentials.user.roles.includes('client')
          });
          this.route.queryParams.subscribe(params =>
            this.router.navigate([params.redirect || '/'], { replaceUrl: true })
          );
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  onSubmit() {
    this.filledPhoneEmail = false;
    if (this.email.nativeElement.value && this.phoneNumber === undefined) {
      this.loginForm.controls.username.setValue(this.email.nativeElement.value);
    } else if (this.phoneNumber !== undefined && this.email.nativeElement.value === '') {
      this.loginForm.controls.username.setValue(this.phoneNumber);
    } else if (this.phoneNumber !== undefined && this.email.nativeElement.value !== '') {
      this.filledPhoneEmail = true;
    }
  }
  // Method to sign in with social networks.
  signIn(platform: string): void {
    if (platform === 'Facebook') {
      platform = FacebookLoginProvider.PROVIDER_ID;
    } else {
      platform = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthentificationService.signIn(platform).then(
      response => {
        console.log(platform + ' logged in user data is= ', response);
        this.user = response;
      },
      err => {
        console.log(err);
      }
    );
  }

  signOut(): void {
    this.socialAuthentificationService.signOut();
    this.user = null;
    console.log('User signed out.');
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

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['', Validators.required],
      remember: true
    });
  }
}
