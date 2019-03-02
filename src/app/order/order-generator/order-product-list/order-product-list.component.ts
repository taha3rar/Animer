import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { OrderDataService } from '../order-data.service';
import { OrderAgriculturalProductComponent } from './order-agricultural-product/order-agricultural-product.component';
import { OrderProcessedProductComponent } from './order-processed-product/order-processed-product.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.scss']
})
export class OrderProductListComponent implements OnInit {
  form: FormGroup;
  @Input()
  currency: string;
  products: ProductInvoice[];
  @Output()
  updateProductsEvent = new EventEmitter<ProductInvoice[]>();
  @Output()
  updateFormEvent = new EventEmitter<FormGroup>();

  constructor(private orderDataService: OrderDataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
      this.currency = this.form.value.currency;
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.products = data;
        this.updateProducts(this.products);
      }
    });
  }

  updateProducts(products: ProductInvoice[]): void {
    this.updateProductsEvent.emit(products);
  }

  updateForm(form: FormGroup): void {
    this.updateFormEvent.emit(form);
  }

  get order() {
    return this.form.controls;
  }

  updateTotalDue(newSubtotal: number): void {
    this.order['subtotal'].setValue(this.order.subtotal.value + newSubtotal);
  }

  deleteProduct($event: number): void {
    const index = $event;
    this.updateTotalDue(-this.products[index].product_subtotal);
    this.products.splice(index, 1);
    if (this.products.length < 1) {
      this.order['currency'].setValue(undefined);
      this.updateForm(this.form);
    }
    this.updateProducts(this.products);
  }

  updateProduct($event: number): void {
    const index = $event;
    if (this.products[index].product_type === 'processed') {
      this.openDialogProcessed(index);
    }
    if (this.products[index].product_type === 'agricultural') {
      this.openDialogAgricultural(index);
    }
  }

  openDialogAgricultural(index?: number): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.order.currency.value
    };

    this.openDialog('720px', OrderAgriculturalProductComponent, data);
  }

  openDialogProcessed(index?: number): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.order.currency.value
    };

    this.openDialog('780px', OrderProcessedProductComponent, data);
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
        if (!this.order.currency.value) {
          this.order['currency'].setValue(data.currency);
          this.updateForm(this.form);
        }
        this.updateTotalDue(data.product.product_subtotal);
        this.products.push(data.product);
      }
      if (data && data.event === 'update') {
        this.updateTotalDue(-data.oldSubtotal);
        this.updateTotalDue(data.product.product_subtotal);
        this.products[data.index] = data.product;
      }
      this.updateProducts(this.products);
    });
  }
}
