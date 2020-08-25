import { BaseValidationComponent } from './../../base-validation/base-validation.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { countries } from '@app/shared/helpers/countries';
declare const $: any;
@Component({
  selector: 'app-additional-eco-details',
  templateUrl: './additional-eco-details.component.html',
  styleUrls: ['./additional-eco-details.component.scss'],
})
export class AdditionalEcoDetailsComponent extends BaseValidationComponent implements OnInit {
  additionalForm: FormGroup;
  countries = countries;
  serviceCount = 1;
  @Output() titleStepper = new EventEmitter<{ title: string; step: number }>();

  constructor(private fb: FormBuilder) {
    super();
    this.additionalForm = this.fb.group({
      file: [undefined, Validators.required],
      services: this.fb.array([this.createForm()]),
    });
  }
  ngOnInit() {
    this.formInput = this.additionalForm;
  }
  createForm() {
    return this.fb.group({
      service: ['', Validators.required],
    });
  }
  addNewInputField(): void {
    this.serviceCount++;
    const control = this.additionalForm.controls.services as FormArray;
    control.push(this.createForm());
  }
  removeInputField(i: number): void {
    const control = this.additionalForm.controls.services as FormArray;
    control.removeAt(this.serviceCount);
    this.serviceCount--;
  }
  fileUpload() {
    $('#file').trigger('click');
    // need endpoint
  }
  onGeneralSubmit() {
    this.onSubmit(this.additionalForm);
    if (this.additionalForm.valid) {
      // submit
    }
  }
  prev() {
    this.titleStepper.emit({ step: 2, title: 'Leadership Details' });
  }
}
