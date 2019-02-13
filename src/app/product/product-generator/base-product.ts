import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { OnInit } from '@angular/core';
import { ProductDataService } from './product-data.service';
import { FormGroup } from '@angular/forms';

export class BaseProduct extends BaseValidationComponent implements OnInit {
  form: FormGroup;
  isProcessed: boolean;

  constructor(protected productDataService: ProductDataService) {
    super();
  }

  ngOnInit() {
    this.productDataService.currentForm.subscribe(form => {
      this.form = form;
      this.formInput = form;
    });

    this.isProcessed = this.productDataService.isProcessed();
  }

  get productf() {
    return this.form.controls;
  }

  next() {
    this.productDataService.setForm(this.form);
    this.productDataService.currentForm.subscribe(form => {
      this.form = form;
    });
    this.formInput = this.form;
  }
}
