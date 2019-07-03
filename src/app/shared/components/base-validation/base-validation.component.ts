import { FormControl, FormGroup } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

export class BaseValidationComponent {
  formInput: FormGroup;
  @ViewChild('submitButton') submitButton: ElementRef;

  disableSubmitButton(status: boolean) {
    this.submitButton.nativeElement.disabled = status;
  }

  isFieldInvalid(field: string) {
    return this.formInput.get(field).invalid && this.formInput.get(field).touched;
  }

  showFieldStyle(field: string) {
    return {
      'has-error': this.isFieldInvalid(field)
    };
  }

  onSubmit(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.onSubmit(control);
      }
    });
  }

  isFieldInvalidNested(parent_field: string, sub_field: string) {
    return (
      this.formInput.get(parent_field).get(sub_field).invalid && this.formInput.get(parent_field).get(sub_field).touched
    );
  }

  showFieldStyleNested(parent_field: string, sub_field: string) {
    return {
      'has-error': this.isFieldInvalidNested(parent_field, sub_field)
    };
  }
}
