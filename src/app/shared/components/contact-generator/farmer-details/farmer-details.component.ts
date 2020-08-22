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
  today = new Date();
  farmerDetailsForm: FormGroup;
  countries = countries;
  @Input() isEdit: boolean;
  @Input() contact: any;
  constructor(private fb: FormBuilder) {
    super();
    this.farmerDetailsForm = this.fb.group({
      fullName: [undefined, Validators.required],
      nationalId: [undefined, Validators.required],
      file: [undefined],
      gender: [undefined, Validators.required],
      birth: [undefined, Validators.required],
      nationality: [undefined, Validators.required],
      phoneNumber: [undefined, Validators.required],
      email: [undefined],
      country: [undefined, Validators.required],
      address: [undefined, Validators.required],
      lat: [undefined],
      long: [undefined],
    });
  }
  ngOnInit() {
    this.formInput = this.farmerDetailsForm;
  }
  fileUpload() {
    $('#file').trigger('click');
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
      console.log('so')
      $('#next').trigger('click');
    }
  }
}
