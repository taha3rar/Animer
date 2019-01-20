import { Component, OnInit, Inject } from '@angular/core';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductInvoice } from '../../base-product-invoice';

@Component({
  selector: 'app-invoice-processed-product',
  templateUrl: './invoice-processed-product.component.html',
  styleUrls: ['./invoice-processed-product.component.scss']
})
export class InvoiceProcessedProductComponent extends BaseProductInvoice implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<InvoiceProcessedProductComponent>
  ) {
    super(dialogRef, data, 'processed');
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
}
