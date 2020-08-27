import { DynamicFormsService } from './../../../../core/forms/dynamic-forms-service';
import { countries } from '../../../helpers/countries';
import { StepperService } from '../../../../core/stepper.service';
import { SdkService } from '../../../../core/sdk.service';
import { SpinnerToggleService } from '../../../services/spinner-toggle.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
declare const $: any;
@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.scss'],
})
export class FarmerDetailsComponent extends BaseValidationComponent implements OnInit {
  title = 'Farmer Details';
  step = 1;
  arr = new Array(3);
  formJson = [
    {
      fieldName: 'fullName',
      label: 'Full Name',
      size: 6,
      type: 'text',
      validators: [Validators.required],
      value: '',
      rowNumber: 1,
    },
    {
      fieldName: 'lastName',
      label: 'Last Name',
      size: 6,
      type: 'text',
      validators: [Validators.required],
      value: undefined,
      rowNumber: 1,
    },
    {
      fieldName: 'Id',
      label: 'ID',
      size: 6,
      type: 'text',
      validators: [Validators.required],
      value: undefined,
      rowNumber: 2,
    },
    {
      fieldName: 'price',
      label: 'Price',
      size: 12,
      type: 'number',
      validators: [],
      value: undefined,
      rowNumber: 3,
    },
  ];
  today = new Date();
  farmerDetailsForm: FormGroup;
  countries = countries;
  @Input() isEdit: boolean;
  @Input() contact: any;
  constructor(private fb: FormBuilder, private dn: DynamicFormsService) {
    super();
    // this.farmerDetailsForm = this.fb.group({
    //   fullName: [undefined, Validators.required],
    //   nationalId: [undefined, Validators.required],
    //   file: [undefined, Validators.required],
    //   gender: [undefined, Validators.required],
    //   birth: [undefined, Validators.required],
    //   nationality: [undefined, Validators.required],
    //   phoneNumber: [undefined, Validators.required],
    //   email: [undefined],
    //   country: [undefined, Validators.required],
    //   address: [undefined, Validators.required],
    //   lat: [undefined],
    //   long: [undefined],
    // });
    this.farmerDetailsForm = this.dn.getJson(this.formJson);
  }
  ngOnInit() {
    this.formInput = this.farmerDetailsForm;
  }
  fileUpload() {
    $('#file').trigger('click');
    // need endpoint
  }
  get details() {
    return this.farmerDetailsForm.controls;
  }
  gender(type: 'male' | 'female') {
    this.farmerDetailsForm.patchValue({
      gender: type,
    });
    if (type === 'male') {
      $('#female').removeClass('bttn-outline-primary');
      $('#female').addClass('bttn-outline');
    } else {
      $('#male').removeClass('bttn-outline-primary');
      $('#male').addClass('bttn-outline');
    }

    $(`#${type}`).addClass('bttn-outline-primary');
    $(`#${type}`).removeClass('bttn-outline');
  }
  onGeneralSubmit() {
    this.onSubmit(this.farmerDetailsForm);
    if (this.farmerDetailsForm.valid) {
      $('#next').trigger('click');
    }
  }
}
