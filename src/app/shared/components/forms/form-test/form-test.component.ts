import { countries } from '@app/shared/helpers/countries';
import { DynamicFormsService } from './../../../../core/forms/dynamic-forms-service';
import { DynamicFormInput } from './../../../../core/forms/dynamic-forms.model';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicForm } from '@app/core/forms/dynamic-forms.model';
import * as Feather from 'feather-icons';
declare const $: any;
@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss'],
})
export class FormTestComponent extends BaseValidationComponent implements OnInit {
  form: FormGroup;
  testForm = new DynamicForm();
  counter = 1;
  showForm = false;
  size: any[];
  former: FormGroup;
  dynamicForm = new DynamicForm();
  isRequired: boolean;
  required: any[] = [null];
  constructor(private fb: FormBuilder, private dn: DynamicFormsService) {
    super();
    this.form = this.fb.group({
      forms: this.fb.array([this.createForm()]),
    });
    this.formInput = this.form;
  }

  ngOnInit() {
    this.formInput = this.form;
  }
  createForm() {
    return this.fb.group({
      fieldName: [undefined, Validators.required],
      label: [undefined, Validators.required],
      type: [undefined, Validators.required],
      size: [undefined, Validators.required],
      rowNumber: [undefined, Validators.required],
      placeholder: [undefined, Validators.required],
      required: [undefined, Validators.required],
      selectLabel: [undefined],
      first: [undefined],
      second: [undefined],
    });
  }
  addNewInputField(): void {
    this.counter++;
    this.required.push(null);
    const control = this.form.controls.forms as FormArray;
    control.push(this.createForm());
    this.formInput = this.form;
  }
  removeInputField(i: number): void {
    const control = this.form.controls.forms as FormArray;
    control.removeAt(this.counter);
    this.required.pop();
    this.counter--;
    this.formInput = this.form;
  }
  gender(type: 'yes' | 'no', i: number) {
    this.form.get('forms').get(i.toString()).patchValue({
      required: type,
    });
    type === 'yes' ? (this.required[i] = true) : (this.required[i] = false);
  }
  radio(type: string, item: DynamicFormInput) {
    const patch = {};
    patch[item.fieldName] = type;
    this.former.patchValue(patch);
    item.radioOptions.first === type ? (item.radioBoolean = true) : (item.radioBoolean = false);
  }
  fileUpload(name: string) {
    $('#' + name).trigger('click');
    // need endpoint
  }
  submit() {
    const form: any = this.form.controls.forms;
    const dynamicForm = new DynamicForm();
    dynamicForm.formRows = this.form
      .get('forms')
      .get((this.counter - 1).toString())
      .get('rowNumber').value;
    console.log(dynamicForm.formRows);
    this.size = new Array(dynamicForm.formRows);
    this.onSubmit(form);
    dynamicForm.inputs = [new DynamicFormInput()];
    dynamicForm.inputs.pop();
    if (this.form.valid) {
      for (let i = 0; i < this.counter; i++) {
        const fieldName = this.form.get('forms').get(i.toString()).get('fieldName').value;
        const label = this.form.get('forms').get(i.toString()).get('label').value;
        const type = this.form.get('forms').get(i.toString()).get('type').value;
        const size = this.form.get('forms').get(i.toString()).get('size').value;
        const rowNumber = this.form.get('forms').get(i.toString()).get('rowNumber').value;
        const placeholder = this.form.get('forms').get(i.toString()).get('placeholder').value;
        const required = this.form.get('forms').get(i.toString()).get('required').value;
        const selectLabel = this.form.get('forms').get(i.toString()).get('placeholder').value;
        const first = this.form.get('forms').get(i.toString()).get('first').value;
        const second = this.form.get('forms').get(i.toString()).get('second').value;
        const input: DynamicFormInput = {
          fieldName: fieldName,
          label: label,
          type: type.toLowerCase() === 'countries' ? 'select' : type.toLowerCase(),
          size: size,
          options: type.toLowerCase() === 'countries' ? countries : undefined,
          rowNumber: rowNumber,
          placeholder: placeholder,
          required: this.required[i],
          selectLabel: placeholder,
          radioOptions: {
            first: first,
            second: second,
          },
          radioBoolean: undefined,
          value: undefined,
          validators: this.required[i] ? [Validators.required] : undefined,
        };

        dynamicForm.inputs.push(input);
      }
      this.former = this.dn.getJson(dynamicForm.inputs);
      this.dynamicForm = dynamicForm;
      this.formInput = this.former;
      console.log(dynamicForm);
      this.showForm = true;
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    Feather.replace();
  }
}
