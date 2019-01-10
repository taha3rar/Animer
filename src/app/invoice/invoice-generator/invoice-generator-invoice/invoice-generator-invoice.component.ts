import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { FormGroup } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent implements OnInit {
  productList: Product[];
  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.productList = [];
  }

  get invoice() {
    return this.form.controls;
  }

  get issuer() {
    return this.form.controls.seller.value;
  }

  get buyer() {
    return this.form.controls.buyer.value;
  }

  get date_created() {
    return this.form.controls.date_created.value;
  }
}
