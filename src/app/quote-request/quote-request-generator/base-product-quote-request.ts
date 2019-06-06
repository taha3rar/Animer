import { MatDialogRef } from '@angular/material';
import { measureUnits } from '@app/shared/helpers/measure';
import { OnInit } from '@angular/core';
import { ProductSetupQuoteRequest } from '@app/core/models/quote-request/productSetup-quoteRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';

export class BaseProductQuoteRequest extends BaseValidationComponent implements OnInit {
  productForm: FormGroup;
  update: boolean;
  units = measureUnits;
  test: string;

  constructor(
    public dialog: MatDialogRef<any>,
    public data: ProductSetupQuoteRequest,
    public formBuilder: FormBuilder,
    private productType: String
  ) {
    super();
    this.data.product ? (this.update = true) : (this.update = false);
    this.productForm = this.formBuilder.group({
      product_type: [this.productType, Validators.required],
      produce: [this.data.product ? this.data.product.produce : undefined, Validators.required],
      type_of_package: [this.data.product ? this.data.product.type_of_package : undefined, Validators.required],
      amount_requested: [this.data.product ? this.data.product.amount_requested : undefined, Validators.required],
      variety: [this.data.product ? this.data.product.variety : undefined, Validators.required],
      package_weight: [this.data.product ? this.data.product.package_weight : undefined, Validators.required],
      weight_unit: [this.data.product ? this.data.product.weight_unit : undefined, Validators.required],
      total_weight: [this.data.product ? this.data.product.total_weight : undefined, Validators.required],
      item_package_type: [this.data.product ? this.data.product.item_package_type : undefined, Validators.required],
      item_measurement_amount: [
        this.data.product ? this.data.product.item_measurement_amount : undefined,
        Validators.required
      ],
      item_measurement_unit: [
        this.data.product ? this.data.product.item_measurement_unit : undefined,
        Validators.required
      ],
      items_per_package: [this.data.product ? this.data.product.items_per_package : undefined, Validators.required],
      total_amount_items: [this.data.product ? this.data.product.total_amount_items : undefined, Validators.required],
      specification: [this.data.product ? this.data.product.specification : undefined]
    });
  }

  ngOnInit() {}

  onExit(): void {
    this.dialog.close();
  }

  public getProductForm() {
    return this.productForm;
  }

  addProduct(): void {
    this.dialog.close({
      event: 'add',
      product: this.productForm.value
    });
  }

  updateProduct(): void {
    this.dialog.close({
      event: 'update',
      product: this.productForm.value,
      index: this.data.index
    });
  }
}
