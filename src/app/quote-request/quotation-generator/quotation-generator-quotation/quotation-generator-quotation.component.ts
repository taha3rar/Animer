import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { ProductQuotation } from '@app/core/models/quotation/product-quotation';

@Component({
  selector: 'app-quotation-generator-quotation',
  templateUrl: './quotation-generator-quotation.component.html',
  styleUrls: ['./quotation-generator-quotation.component.scss']
})
export class QuotationGeneratorQuotationComponent implements OnInit {
  @Input()
  quotationForm: FormGroup;
  @Input()
  quoteRequest: QuoteRequest;
  quotation: Quotation;
  products: ProductQuotation[] = [];
  @Output()
  quotationEvent = new EventEmitter<Quotation>();

  constructor() {}

  ngOnInit() {
    this.quotation = this.quotationForm.value;
    // this.product = <ProductQuotation>this.quoteRequest.product;
    this.onChanges();
  }

  get buyer() {
    return this.quotationForm.controls.buyer.value;
  }

  get seller() {
    return this.quotationForm.controls.seller.value;
  }

  onChanges() {
    this.quotationForm.get('seller_comments').valueChanges.subscribe(seller_comments => {
      this.quotation.seller_comments = seller_comments;
      this.quotationEvent.emit(this.quotation);
    });
  }

  setProductSubtotal(index: number): void {
    if (this.products[index].product_type === 'agricultural') {
      this.products[index].product_subtotal = Number(
        (this.products[index].total_weight * this.products[index].price_per_unit).toFixed(2)
      );
    } else {
      this.products[index].product_subtotal = Number(
        (this.products[index].quantity * this.products[index].price_per_package).toFixed(2)
      );
    }
    this.setTotalPrice();
  }

  setTotalPrice() {
    let total_price = 0;
    this.products.forEach(function(product: ProductQuotation) {
      if (product.product_subtotal) {
        total_price += product.product_subtotal;
      }
    });
    this.quotationForm.patchValue({
      total_price: total_price || undefined
    });
    this.quotation.products = this.products;
    this.quotation.total_price = this.quotationForm.value.total_price;
    this.quotationEvent.emit(this.quotation);
  }
}
