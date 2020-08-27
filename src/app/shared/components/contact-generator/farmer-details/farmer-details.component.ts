import { DynamicForm, DynamicFormInput } from './../../../../core/forms/dynamic-forms.model';
import { DynamicFormsService } from './../../../../core/forms/dynamic-forms-service';
import { countries } from '../../../helpers/countries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import * as Feather from 'feather-icons';
declare const $: any;
@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.scss'],
})
export class FarmerDetailsComponent extends BaseValidationComponent implements OnInit, AfterViewInit {
  title = 'Farmer Details';
  step = 1;
  formJson: DynamicForm = {
    inputs: [
      {
        fieldName: 'fullName',
        label: 'Full Name',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: '',
        rowNumber: 1,
        placeholder: undefined,
        required: true,
      },
      {
        fieldName: 'nationalId',
        label: 'National identity number',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 1,
        placeholder: undefined,
        required: true,
      },
      {
        fieldName: 'file',
        label: 'Copy of identification document',
        size: 6,
        type: 'file',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 2,
        placeholder: undefined,
        required: true,
      },
      {
        fieldName: 'gender',
        label: 'Gender',
        size: 6,
        type: 'radio',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 2,
        placeholder: undefined,
        required: true,
        radioOptions: { first: 'male', second: 'female' },
      },
      {
        fieldName: 'birth',
        label: 'Date of birth',
        size: 6,
        type: 'date',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 3,
        placeholder: undefined,
        required: true,
        max: new Date(),
      },
      {
        fieldName: 'nationality',
        label: 'Nationality',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 3,
        placeholder: undefined,
        required: true,
      },
      {
        fieldName: 'phoneNumber',
        label: 'Phone number',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 4,
        placeholder: undefined,
        required: true,
      },
      {
        fieldName: 'email',
        label: 'Email',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 4,
        placeholder: undefined,
        required: false,
      },
      {
        fieldName: 'country',
        label: 'Country',
        size: 6,
        type: 'select',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 5,
        placeholder: undefined,
        required: true,
        selectLabel: 'Select Country',
        options: countries,
      },
      {
        fieldName: 'address',
        label: 'Address',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 5,
        placeholder: 'e.g. name of city, region, village, school nearby, etc.',
        required: true,
      },
      {
        fieldName: 'lat',
        label: 'GPS - Latitude',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 6,
        placeholder: undefined,
        required: false,
      },
      {
        fieldName: 'long',
        label: 'GPS - Longitude',
        size: 6,
        type: 'text',
        validators: [Validators.required],
        value: undefined,
        rowNumber: 6,
        placeholder: undefined,
        required: false,
      },
    ],
    formRows: 6,
  };
  arr = new Array(this.formJson.formRows);

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
    this.farmerDetailsForm = this.dn.getJson(this.formJson.inputs);
  }
  ngOnInit() {
    this.formInput = this.farmerDetailsForm;
  }
  fileUpload(name: string) {
    $('#' + name).trigger('click');
    // need endpoint
  }
  get details() {
    return this.farmerDetailsForm.controls;
  }
  radio(type: string, item: DynamicFormInput) {
    const patch = {};
    patch[item.fieldName] = type;
    this.farmerDetailsForm.patchValue(patch);
    item.radioOptions.first === type ? (item.radioBoolean = true) : (item.radioBoolean = false);
  }
  onGeneralSubmit() {
    this.onSubmit(this.farmerDetailsForm);
    if (this.farmerDetailsForm.valid) {
      $('#next').trigger('click');
    }
  }
  ngAfterViewInit() {
    Feather.replace();
  }
}
