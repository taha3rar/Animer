import { Component, OnInit, Input } from '@angular/core';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-quote-request-product-details',
  templateUrl: './create-quote-request-product-details.component.html',
  styleUrls: ['./create-quote-request-product-details.component.scss']
})
export class CreateQuoteRequestProductDetailsComponent implements OnInit {
  @Input()
  quoteRequest: QuoteRequest;
  productDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.productDetailsForm = this.formBuilder.group({
      produce: ['', Validators.required],
      variety: ['', Validators.required],
      specification: ['', Validators.required]
    });
  }

  get productDetailsf() {
    return this.productDetailsForm.controls;
  }

  next() {
    this.quoteRequest.produce = this.productDetailsf.produce.value;
    this.quoteRequest.variety = this.productDetailsf.variety.value;
    this.quoteRequest.specification = this.productDetailsf.specification.value;
  }
}
