import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/core/models/product';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-generator-summary',
  templateUrl: './order-generator-summary.component.html',
  styleUrls: ['./order-generator-summary.component.scss']
})
export class OrderGeneratorSummaryComponent implements OnInit {
  @Input()
  productList: Product[];
  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    console.log(this.productList);
  }

  get order() {
    return this.form.controls;
  }
}
