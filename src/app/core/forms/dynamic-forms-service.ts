import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicForm } from './dynamic-forms.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService {
  constructor(private fb: FormBuilder) {}
  getJson(formArray: DynamicForm[]) {
    const obj = {};
    for (let i = 0; i < formArray.length; i++) {
      obj[formArray[i].fieldName] = [formArray[i].value, formArray[i].validators];
    }
    console.log(obj);
    return this.fb.group(obj);
  }
}
