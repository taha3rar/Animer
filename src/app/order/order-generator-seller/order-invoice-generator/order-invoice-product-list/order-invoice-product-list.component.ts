import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

@Component({
  selector: 'app-order-invoice-product-list',
  templateUrl: './order-invoice-product-list.component.html',
  styleUrls: ['./order-invoice-product-list.component.scss']
})
export class OrderInvoiceProductListComponent implements OnInit {
  @Input()
  products: ProductInvoice[];
  @Input()
  currency: string;
  @Output()
  deleteProductEvent = new EventEmitter<Number>();
  @Output()
  updateProductEvent = new EventEmitter<Number>();

  constructor() {}

  ngOnInit() {}

  deleteProduct(index: number): void {
    this.deleteProductEvent.emit(index);
  }

  updateProduct(index: number): void {
    this.updateProductEvent.emit(index);
  }
}
