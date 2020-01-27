import { InputProductComponent } from './../products/input-product/input-product.component';
import { Component, OnInit } from '@angular/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
// tslint:disable-next-line:max-line-length
import { ModalAgriculturalProductComponent } from '@app/shared/components/products/modal-agricultural-product/modal-agricultural-product.component';
// tslint:disable-next-line:max-line-length
import { ModalProcessedProductComponent } from '@app/shared/components/products/modal-processed-product/modal-processed-product.component';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderDataService } from '@app/order/order-generator/order-data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-measurement-validation',
  template: ''
})
export class DocumentGeneratorComponent extends BaseValidationComponent implements OnInit {
  productsValid: boolean;
  form: FormGroup;
  currency: string;
  products: ProductInvoice[] = [];

  constructor(public dialog: MatDialog, public orderDataService?: OrderDataService) {
    super();
  }

  ngOnInit() {
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
      this.currency = this.form.value.currency;
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.products = data;
      }
    });
  }

  get document() {
    return this.form.controls;
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

  updateTotalDue(newSubtotal: number): void {
    this.document['subtotal'].setValue(this.document.subtotal.value + newSubtotal);
  }

  deleteProduct($event: number): void {
    const index = $event;
    this.updateTotalDue(-this.products[index].product_subtotal);
    this.products.splice(index, 1);
    if (this.products.length < 1) {
      this.document['currency'].setValue(undefined);
      this.products = [];
    }
  }

  updateProduct($event: number): void {
    const index = $event;
    if (this.products[index].product_type === 'processed') {
      this.openDialogProcessed(index);
    }
    if (this.products[index].product_type === 'agricultural') {
      this.openDialogAgricultural(index);
    }
    if (this.products[index].product_type === 'input') {
      this.openDialogInput(index);
    }
  }

  openDialogAgricultural(index?: number, transactionType?: string): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.document.currency.value,
      transactionType: transactionType
    };

    this.openDialog('80vh', ModalAgriculturalProductComponent, data);
  }

  openDialogInput(index?: number, transactionType?: string): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.document.currency.value,
      transactionType: transactionType
    };

    this.openDialog('80vh', InputProductComponent, data);
  }

  openDialogProcessed(index?: number, transactionType?: string): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.document.currency.value,
      transactionType: transactionType
    };

    this.openDialog('92vh', ModalProcessedProductComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = height;
    dialogConfig.width = '850px';
    dialogConfig.data = dialogData;

    const dialogRef = this.dialog.open(component, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.event === 'submit') {
        if (!this.document.currency.value) {
          this.document['currency'].setValue(data.currency);
        }
        this.updateTotalDue(data.product.product_subtotal);
        this.products.push(data.product);
      }
      if (data && data.event === 'update') {
        this.updateTotalDue(-data.oldSubtotal);
        this.updateTotalDue(data.product.product_subtotal);
        this.products[data.index] = data.product;
      }
    });
  }

  checkProducts() {
    this.productsValid = false;
  }
}
