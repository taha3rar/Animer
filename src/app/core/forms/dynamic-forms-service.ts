import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicForm } from './dynamic-forms.model';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormsService {
    constructor(private fb: FormBuilder) {
    }
    getJson(formArray: DynamicForm[]) {
        let obj = {};
        for (const field of formArray) {
            const name = field.fieldName;
            const item = { name: [field.value || undefined, field.validators] };
            obj = { ...obj, ...item };
        }
        return this.fb.group(obj);
    }

}
