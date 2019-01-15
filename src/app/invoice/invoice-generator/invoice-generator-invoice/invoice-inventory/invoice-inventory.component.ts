import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '@app/core/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-inventory',
  templateUrl: './invoice-inventory.component.html',
  styleUrls: ['./invoice-inventory.component.scss']
})
export class InvoiceInventoryComponent implements OnInit {
  products: Product[];
  newProducts: Product[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InvoiceInventoryComponent>) {}

  ngOnInit() {
    this.products = this.data.products;
    this.products.forEach(product => {
      product['quantityMax'] = product.quantity;
    });
  }

  onExit() {
    this.dialogRef.close();
  }

  incrementQ(product: any) {
    if (product.quantity < product.quantityMax) {
      product.quantity += 1;
    } else {
      product.quantity = product.quantityMax;
    }
  }
  decrementQ(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    } else {
      product.quantity = 0;
    }
  }

  addProducts() {
    this.products.forEach(product => {
      if (product.quantity > 0) {
        if (product.product_type === 'agricultural') {
          product['total_weight'] = product.package_weight * product.quantity;
          product['product_subtotal'] = product.package_price * product.quantity;
        }
        if (product.product_type === 'processed') {
          product['product_subtotal'] = product.package_price * product.quantity;
        }
        this.newProducts.push(product);
      }
    });
    this.dialogRef.close(this.newProducts);
  }
}
