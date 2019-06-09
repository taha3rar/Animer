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
  product: ProductQuotation;
  @Output()
  quotationEvent = new EventEmitter<Quotation>();

  constructor() {}

  ngOnInit() {
    this.quotation = this.quotationForm.value;
    this.product = <ProductQuotation>this.quoteRequest.product;
    this.product.quantity_requested = this.product.quantity_requested;
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
    if (this.product.product_type === 'agricultural') {
      this.product.product_subtotal = Number(
        (this.product.total_weight_offered * this.product.price_per_unit).toFixed(2)
      );
    } else {
      this.product.product_subtotal = Number((this.product.quantity_offered * this.product.package_price).toFixed(2));
    }
    this.setTotalPrice();
  }

  setTotalPrice() {
    this.quotationForm.patchValue({
      total_price: this.product.product_subtotal || undefined
    });
    this.quotation.product = this.product;
    this.quotation.total_price = this.quotationForm.value.total_price;
    this.quotationEvent.emit(this.quotation);
  }
}
