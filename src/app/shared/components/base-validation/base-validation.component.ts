import { FormControl, FormGroup } from '@angular/forms';
import { ViewChildren, ElementRef, QueryList } from '@angular/core';

export class BaseValidationComponent {
  formInput: FormGroup;
  @ViewChildren('submitButton') submitButtons: QueryList<any>;

  disableSubmitButton(status: boolean) {
    this.submitButtons.forEach(button => {
      button.nativeElement.disabled = status;
    });
  }

  // disableDraftButton(status: boolean) {
  //   this.draftButton.nativeElement.disabled = status;
  // }

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
