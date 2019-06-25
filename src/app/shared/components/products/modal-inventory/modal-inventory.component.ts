import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '@app/core/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { defaultValues } from '@app/shared/helpers/default_values';
import { BaseNavigationComponent } from '@app/shared/components/base-navigation/base-navigation.component';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

@Component({
  selector: 'app-modal-inventory',
  templateUrl: './modal-inventory.component.html',
  styleUrls: ['./modal-inventory.component.scss']
})
export class ModalInventoryComponent extends BaseNavigationComponent implements OnInit {
  inventoryProducts: ProductInvoice[];
  agriculturalProducts: ProductInvoice[];
  processedProducts: ProductInvoice[];
  newProducts: ProductInvoice[] = [];
  currency: string = undefined;
  noCurrency: boolean;
  fromQuotation: boolean;
  chosenProducts: ProductInvoice[];
  initialList: ProductInvoice[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalInventoryComponent>) {
    super();
  }

  ngOnInit() {
    this.noCurrency = true;
    this.fromQuotation = this.data.fromQuotation;
    this.chosenProducts = JSON.parse(JSON.stringify(this.data.chosenProducts));
    this.initialList = JSON.parse(JSON.stringify(this.data.chosenProducts));
    this.inventoryProducts = JSON.parse(JSON.stringify(this.data.inventoryProducts));
    if (!this.fromQuotation) {
      this.inventoryProducts.forEach((product: ProductInvoice) => {
        product['quantityMax'] = product.quantity;
        product['totalWeightMax'] = product.total_weight;
        product.quantity = 0;
      });
    }
    this.currency = this.data.currency;
    if (this.currency) {
      this.noCurrency = false;
    }
    this.agriculturalProducts = this.inventoryProducts.filter(p => p.product_type === 'agricultural');
    this.processedProducts = this.inventoryProducts.filter(p => p.product_type === 'processed');
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
    this.inventoryProducts.forEach(product => {
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

  addProduct(product: ProductInvoice, isChecked: boolean) {
    if (isChecked) {
      this.chosenProducts.push(product);
    } else {
      const index = this.chosenProducts.findIndex(x => x === product);
      this.chosenProducts.splice(index, 1);
    }
  }

  isAdded(product: ProductInvoice) {
    if (this.chosenProducts.length > 0) {
      return this.chosenProducts.findIndex(x => JSON.stringify(x) === JSON.stringify(product)) >= 0;
    } else {
      return false;
    }
  }

  isListed(product: ProductInvoice) {
    if (this.initialList.length > 0) {
      return this.initialList.findIndex(x => JSON.stringify(x) === JSON.stringify(product)) >= 0;
    } else {
      return false;
    }
  }

  addQuotedProducts() {
    this.dialogRef.close(this.chosenProducts);
  }

  product_image(product: Product) {
    if (!product.image) {
      return product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return product.image;
  }
}
