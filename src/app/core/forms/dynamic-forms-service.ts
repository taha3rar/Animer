import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicFormInput } from './dynamic-forms.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService {
  constructor(private fb: FormBuilder) {}
  getJson(formArray: DynamicFormInput[]) {
    const obj = {};
    for (let i = 0; i < formArray.length; i++) {
      obj[formArray[i].fieldName] = [formArray[i].value, formArray[i].validators];
    }
    return this.fb.group(obj);
  }
}
