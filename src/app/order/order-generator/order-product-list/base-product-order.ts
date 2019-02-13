import { MatDialogRef } from '@angular/material';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { measureUnits } from '@app/shared/helpers/measure';
import { OnInit } from '@angular/core';
import { currencies } from '@app/shared/helpers/currencies';

export class BaseProductOrder implements OnInit {
  currency: string;
  product: ProductInvoice;
  oldSubtotal: Number;
  update: boolean;
  currencies = currencies;
  units = measureUnits;

  constructor(private dialog: MatDialogRef<any>, public data: ProductSetupInvoice, private productType: string) {}

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
      this.product = new ProductInvoice();
    }

    this.product.product_type = this.productType;
  }

  onExit(): void {
    this.dialog.close();
  }

  addProduct(): void {
    this.dialog.close({
      event: 'submit',
      product: this.product,
      currency: this.currency
    });
  }

  updateProduct(): void {
    this.data.productList[this.data.index] = this.product;
    this.dialog.close({
      event: 'update',
      index: this.data.index,
      oldSubtotal: this.oldSubtotal,
      product: this.product
    });
  }
}
