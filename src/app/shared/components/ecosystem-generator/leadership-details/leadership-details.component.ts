import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  isMale: boolean;
  countries = countries;
  @Output() titleStepper = new EventEmitter<{ title: string; step: number }>();
  @ViewChild('next') next: ElementRef<HTMLElement>;
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
    type === 'male' ? (this.isMale = true) : (this.isMale = false);
  }
  onGeneralSubmit() {
    this.onSubmit(this.leadershipForm);
    if (this.leadershipForm.valid) {
      this.titleStepper.emit({ step: 3, title: 'Additional Details' });
      const el: HTMLElement = this.next.nativeElement;
      el.click();
    }
  }
  onPrev() {
    this.titleStepper.emit({ step: 1, title: 'Organisation Details' });
  }
}
