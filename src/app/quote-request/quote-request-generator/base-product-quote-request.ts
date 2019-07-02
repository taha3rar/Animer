import { MatDialogRef } from '@angular/material';
import { measureUnits } from '@app/shared/helpers/measure';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { ProductQuoteRequest } from '@app/core/models/quote-request/product-quoteRequest';

export class BaseProductQuoteRequest extends BaseValidationComponent implements OnInit {
  productForm: FormGroup;
  update: boolean;
  units = measureUnits;
  test: string;

  constructor(
    public dialog: MatDialogRef<any>,
    public newProduct: ProductQuoteRequest,
    public formBuilder: FormBuilder,
    private productType: String
  ) {
    super();
    this.newProduct ? (this.update = true) : (this.update = false);
    this.productForm = this.formBuilder.group({
      product_type: [this.productType, Validators.required],
      produce: [this.newProduct ? this.newProduct.produce : undefined, Validators.required],
      type_of_package: [this.newProduct ? this.newProduct.type_of_package : undefined, Validators.required],
      quantity_requested: [this.newProduct ? this.newProduct.quantity_requested : undefined, Validators.required],
      variety: [this.newProduct ? this.newProduct.variety : undefined, Validators.required],
      package_weight: [this.newProduct ? this.newProduct.package_weight : undefined, Validators.required],
      weight_unit: [this.newProduct ? this.newProduct.weight_unit : undefined, Validators.required],
      total_weight_requested: [
        this.newProduct ? this.newProduct.total_weight_requested : undefined,
        Validators.required
      ],
      item_package_type: [this.newProduct ? this.newProduct.item_package_type : undefined, Validators.required],
      item_measurement_amount: [
        this.newProduct ? this.newProduct.item_measurement_amount : undefined,
        Validators.required
      ],
      item_measurement_unit: [this.newProduct ? this.newProduct.item_measurement_unit : undefined, Validators.required],
      items_per_package: [this.newProduct ? this.newProduct.items_per_package : undefined, Validators.required],
      total_amount_items: [this.newProduct ? this.newProduct.total_amount_items : undefined, Validators.required],
      specification: [this.newProduct ? this.newProduct.specification : undefined]
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
      product: this.productForm.value
    });
  }
}
