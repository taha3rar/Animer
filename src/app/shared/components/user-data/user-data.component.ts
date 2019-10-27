import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@app/core/models/order/user';
import { FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { BaseValidationComponent } from '../base-validation/base-validation.component';

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

  constructor() {
    super();
  }

  ngOnInit() {}

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
}
