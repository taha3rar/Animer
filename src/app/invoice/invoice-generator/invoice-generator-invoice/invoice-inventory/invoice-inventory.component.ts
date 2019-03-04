import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '@app/core/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-invoice-inventory',
  templateUrl: './invoice-inventory.component.html',
  styleUrls: ['./invoice-inventory.component.scss']
})
export class InvoiceInventoryComponent implements OnInit {
  products: Product[];
  agriculturalProducts: Product[];
  processedProducts: Product[];
  newProducts: Product[] = [];
  currency: string = undefined;
  noCurrency: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InvoiceInventoryComponent>) {}

  ngOnInit() {
    this.noCurrency = true;
    this.products = JSON.parse(JSON.stringify(this.data.products));
    this.products.forEach((product: Product) => {
      product['quantityMax'] = product.quantity;
      product.quantity = 0;
    });
    this.currency = this.data.currency;
    if (this.currency) {
      this.noCurrency = false;
    }
    this.agriculturalProducts = this.products.filter(p => p.product_type === 'agricultural');
    this.processedProducts = this.products.filter(p => p.product_type === 'processed');
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
    this.productsValidation(false);
  }
  decrementQ(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    } else {
      product.quantity = 0;
    }
    this.productsValidation(false);
  }

  checkProductInput(product: any) {
    if (product.quantity > product.quantityMax) {
      product.quantity = product.quantityMax;
    } else if (product.quantity <= 0) {
      product.quantity = 0;
    } else {
      product.quantity = product.quantity;
    }
    this.productsValidation(false);
  }

  productsValidation(submit: boolean) {
    let subtotal = 0;
    this.products.forEach(product => {
      if (product.quantity > 0) {
        if (!this.currency) {
          this.currency = product.currency;
        }
        if (product.product_type === 'agricultural') {
          product['total_weight'] = product.package_weight * product.quantity;
          product['product_subtotal'] = product.package_price * product.quantity;
        }
        if (product.product_type === 'processed') {
          product['product_subtotal'] = product.package_price * product.quantity;
        }
        subtotal = subtotal + product['product_subtotal'];
        if (submit) {
          this.newProducts.push(product);
        }
      }
    });
    if (subtotal === 0 && this.noCurrency) {
      this.currency = undefined;
    }
    if (submit) {
      this.dialogRef.close(this.newProducts);
    }
  }

  product_image(product: Product) {
    if (!product.image) {
      return product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return product.image;
  }
}
