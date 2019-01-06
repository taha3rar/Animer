import { Component, OnInit, Input } from '@angular/core';
import { processedPackageUnits } from '@app/shared/_helpers/processed';
import { Product } from '@app/core/models/order/product';

@Component({
  selector: 'app-product-packing-details',
  templateUrl: './product-packing-details.component.html',
  styleUrls: ['./product-packing-details.component.scss']
})
export class ProductPackingDetailsComponent implements OnInit {
  units = processedPackageUnits;
  @Input()
  product: Product;
  isProcessed = false;

  constructor() {}

  ngOnInit() {
    // if (this.product.product_type === 'processed') {
    //   this.isProcessed = true;
    // }
  }
}
