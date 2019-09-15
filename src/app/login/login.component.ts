import { UserService } from '@app/core/api/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
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
            role: credentials.user.roles[0]
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

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['', Validators.required],
      remember: true
    });
  }
}
