import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

@Component({
  selector: 'app-invoice-product-list',
  templateUrl: './invoice-product-list.component.html',
  styleUrls: ['./invoice-product-list.component.scss']
})
export class InvoiceProductListComponent implements OnInit {
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
