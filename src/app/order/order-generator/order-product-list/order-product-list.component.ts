import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.scss']
})
export class OrderProductListComponent implements OnInit {
  form: FormGroup;
  @Input()
  currency: string;
  @Input()
  products: ProductInvoice[] = [];
  @Output()
  updateProductEvent = new EventEmitter<Number>();
  @Output()
  deleteProductEvent = new EventEmitter<Number>();

  constructor() {}

  ngOnInit() {}

  deleteProduct(index: number): void {
    this.deleteProductEvent.emit(index);
  }

  updateProduct(index: number): void {
    this.updateProductEvent.emit(index);
  }

  get order() {
    return this.form.controls;
  }
}
