import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable()
export class ProductDataService {
  productId: string;
  type: string;
  formSource = new BehaviorSubject(undefined);
  currentForm = this.formSource.asObservable();

  constructor() {}

  setForm(form: FormGroup) {
    this.formSource.next(form);
  }

  setType(type: string) {
    this.type = type;
  }

  setProductId(productId: string) {
    this.productId = productId;
  }

  isProcessed() {
    return this.type === 'processed';
  }

  requiredForProcessed(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.type === 'processed') {
        return control.value ? null : { requiredForProcessed: true };
      }
      return null;
    };
  }

  requiredForAgricultural(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.type === 'agricultural') {
        return control.value ? null : { requiredForProcessed: true };
      }
      return null;
    };
  }
}
