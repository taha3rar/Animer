import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { countries } from '@app/shared/helpers/countries';
import * as Feather from 'feather-icons';
declare const $: any;
@Component({
  selector: 'app-leadership-details',
  templateUrl: './leadership-details.component.html',
  styleUrls: ['./leadership-details.component.scss'],
})
export class LeadershipDetailsComponent extends BaseValidationComponent implements OnInit, AfterViewInit {
  title = 'Farmer Details';
  step = 1;
  today = new Date();
  leadershipForm: FormGroup;
  countries = countries;
  @Output() titleStepper = new EventEmitter<{ title: string; step: number }>();

  constructor(private fb: FormBuilder) {
    super();
    this.leadershipForm = this.fb.group({
      fullName: [undefined, Validators.required],
      nationalId: [undefined, Validators.required],
      file: [undefined, Validators.required],
      gender: [undefined, Validators.required],
      birth: [undefined, Validators.required],
      role: [undefined, Validators.required],
      nationality: [undefined, Validators.required],
      phoneNumber: [undefined, Validators.required],
      country: [undefined, Validators.required],
      address: [undefined, Validators.required],
    });
  }
  ngAfterViewInit() {
    Feather.replace();
  }
  ngOnInit() {
    this.formInput = this.leadershipForm;
  }
  fileUpload() {
    $('#file').trigger('click');
    // need endpoint
  }
  get details() {
    return this.leadershipForm.controls;
  }
  gender(type: 'male' | 'female') {
    this.leadershipForm.patchValue({
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
    this.onSubmit(this.leadershipForm);
    if (this.leadershipForm.valid) {
      this.titleStepper.emit({ step: 3, title: 'Additional Details' });
      $('#next').trigger('click');
    }
  }
  onPrev() {
    this.titleStepper.emit({ step: 1, title: 'Organisation Details' });
  }
}
