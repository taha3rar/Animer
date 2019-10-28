import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/core/models/order/user';
import { FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { BaseValidationComponent } from '../base-validation/base-validation.component';
import { countries } from '@app/shared/helpers/countries';
import * as libphonenumber from 'google-libphonenumber';

declare const $: any;

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent extends BaseValidationComponent implements OnInit {
  @Input()
  issued_by: Boolean;
  @Input()
  issued_for: Boolean;
  @Input()
  user: User;
  @Input()
  openDocument: Boolean;
  @Input()
  formInput: FormGroup;
  countries = countries;
  phoneUtil: any;
  regionCode: string;
  phoneCode: string;
  partialPhoneNumber: string;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.openDocument) {
      this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
      this.regionCode = 'US';
      this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    }
    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }

  onChangeContactType(contactType: string, isChecked: boolean) {
    const contactTypesFormArray = <FormArray>this.formInput.controls.contact_by;
    if (isChecked) {
      contactTypesFormArray.push(new FormControl(contactType));
      if (contactType === 'email') {
        this.formInput.controls.email.setValidators([Validators.required, Validators.email]);
        this.formInput.controls.email.updateValueAndValidity();
      } else {
        this.formInput.controls.phone_number.setValidators([Validators.required]);
        this.formInput.controls.phone_number.updateValueAndValidity();
      }
    } else {
      const index = contactTypesFormArray.controls.findIndex(x => x.value === contactType);
      contactTypesFormArray.removeAt(index);
      if (contactType === 'email') {
        this.formInput.controls.email.setValidators([Validators.email]);
        this.formInput.controls.email.updateValueAndValidity();
      } else {
        this.formInput.controls.phone_number.setValidators([]);
        this.formInput.controls.phone_number.updateValueAndValidity();
      }
    }
  }

  isRequired(abstractControl: AbstractControl) {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    if (abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
        if (abstractControl['controls'][controlName]) {
          if (this.isRequired(abstractControl['controls'][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.formInput.patchValue({ phone_number: undefined });
      return;
    }
    this.formInput.patchValue({ phone_number: this.phoneUtil.format(phoneNumber, PNF.E164) });
  }

  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='18' width='27'><span>\xa0\xa0${country}</span>`;
  }

  markAsTouched(formControl: string) {
    this.formInput.get(formControl).markAsTouched();
  }
}
