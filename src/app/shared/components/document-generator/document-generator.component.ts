import { Component } from '@angular/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

@Component({
  selector: 'app-measurement-validation',
  template: ''
})
export class DocumentGeneratorComponent extends BaseValidationComponent {
  constructor() {
    super();
  }

  measurementUnitConflict(products: ProductInvoice[]): string {
    let baseMeasurementUnit: string;
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_type === 'agricultural') {
        if (!baseMeasurementUnit) {
          baseMeasurementUnit = products[i].weight_unit;
        } else {
          if (baseMeasurementUnit !== products[i].weight_unit) {
            return undefined;
          }
        }
      }
    }
    return baseMeasurementUnit;
  }
}
