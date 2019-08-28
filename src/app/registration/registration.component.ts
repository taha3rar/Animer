import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '@app/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { Router, ActivatedRoute } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';
import { UserRegistration } from '@app/core/models/user/user-registration';

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
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  partialPhoneNumber: string;
  emailPhoneError = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService) {
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
      return;
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

    this.userService.saveNewUser(this.newUser).subscribe(
      data => {
        if (data._id) {
          $('#p2').css({ display: 'none' });
          $('#p3').css({ display: 'flex' });
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
    $('#p0').css({ display: 'none' });
    $('#p1').css({ display: 'none' });
    $('#p2').css({ display: 'none' });
    $('#p3').css({ display: 'none' });

    if (showDiv === 'p0') {
      $('#p0').css({ display: 'block' });
    } else if (showDiv === 'p1') {
      $('#p1').css({ display: 'block' });
    } else if (showDiv === 'p2') {
      $('#p2').css({ display: 'block' });
    } else {
      $('#p3').css({ display: 'block' });
    }
  }

  onActiveBtn(btnType: string) {
    this.userType = btnType;
  }
}
