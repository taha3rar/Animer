import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/core/models/product';
import { FormGroup } from '@angular/forms';
import { defaultValues } from '@app/shared/helpers/default_values';

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

  product_image(product: Product) {
    if (!product.image) {
      return product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return product.image;
  }
}
