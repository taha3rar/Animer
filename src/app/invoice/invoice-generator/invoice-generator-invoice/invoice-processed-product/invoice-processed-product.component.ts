import { Component, OnInit, Inject } from '@angular/core';
import { processedPackageUnits } from '@app/shared/_helpers/processed';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { currencies } from '@app/shared/_helpers/product_details';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-processed-product',
  templateUrl: './invoice-processed-product.component.html',
  styleUrls: ['./invoice-processed-product.component.scss']
})
export class InvoiceProcessedProductComponent implements OnInit {
  units = processedPackageUnits;
  currencies = currencies;
  product: ProductInvoice;
  update: Boolean;
  oldSubtotal: Number;
  currency: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<InvoiceProcessedProductComponent>
  ) {}

  ngOnInit() {
    this.update = false;
    if (this.data.currency) {
      this.currency = this.data.currency;
    }
    if (Number(this.data.index) >= 0) {
      this.product = JSON.parse(JSON.stringify(this.data.productList[this.data.index]));
      this.oldSubtotal = this.product.product_subtotal;
      this.update = true;
    } else {
      this.product = {
        _id: undefined,
        numericId: undefined,
        product_type: 'processed',
        produce: undefined,
        variety: undefined,
        type_of_package: undefined,
        package_weight: undefined,
        weight_unit: undefined,
        weight_details: true,
        total_weight: undefined,
        item_package_type: undefined,
        item_measurement_amount: undefined,
        item_measurement_unit: undefined,
        items_per_package: undefined,
        total_amount_items: undefined,
        package_price: undefined,
        price_per_unit: undefined,
        quantity: undefined,
        product_subtotal: undefined,
        individual_details: true,
        price_details: true,
        out_of_inventory: false,
        to_inventory: false
      };
    }
  }

  onExit(): void {
    this.dialogRef.close();
  }

  setTotalItemsAmount() {
    if (this.product.items_per_package && this.product.quantity) {
      this.product.total_amount_items = Number((this.product.items_per_package * this.product.quantity).toFixed(2));
    } else {
      this.product.total_amount_items = undefined;
    }
  }

  setPricePackage() {
    if (this.product.quantity && this.product.package_price) {
      this.product.product_subtotal = Number((this.product.quantity * this.product.package_price).toFixed(2));
    } else {
      this.product.product_subtotal = undefined;
    }
  }

  addProduct(): void {
    this.dialogRef.close({
      event: 'submit',
      product: this.product,
      currency: this.currency
    });
  }

  updateProduct(): void {
    this.data.productList[this.data.index] = this.product;
    this.dialogRef.close({
      event: 'update',
      index: this.data.index,
      oldSubtotal: this.oldSubtotal,
      product: this.product
    });
  }
}
