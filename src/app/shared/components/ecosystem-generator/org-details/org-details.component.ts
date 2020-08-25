import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { countries } from '@app/shared/helpers/countries';
declare const $: any;
@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent extends BaseValidationComponent implements OnInit {
  orgDetailsForm: FormGroup;
  countries = countries;
  @Output() titleStepper = new EventEmitter<{ title: string; step: number }>();
  constructor(private fb: FormBuilder) {
    super();
    this.orgDetailsForm = this.fb.group({
      name: [undefined, Validators.required],
      type: [undefined, Validators.required],
      registrationNumber: [undefined, Validators.required],
      yearOfIncorporation: [undefined, Validators.required],
      phoneNumber: [undefined, Validators.required],
      email: [undefined],
      country: [undefined, Validators.required],
      address: [undefined, Validators.required],
    });
  }
  onGeneralSubmit() {
    this.onSubmit(this.orgDetailsForm);
    if (this.orgDetailsForm.valid) {
      this.titleStepper.emit({ step: 2, title: 'Leadership Details' });
      $('#next').trigger('click');
    }
  }
  ngOnInit() {
    this.formInput = this.orgDetailsForm;
  }
}
