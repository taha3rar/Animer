import { Component, OnInit, Inject } from '@angular/core';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductOrder } from '../../../../order/order-generator/order-product-list/base-product-order';

@Component({
  selector: 'app-modal-processed-product',
  templateUrl: './modal-processed-product.component.html',
  styleUrls: ['./modal-processed-product.component.scss']
})
export class ModalProcessedProductComponent extends BaseProductOrder implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<ModalProcessedProductComponent>
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
