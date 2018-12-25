import { Component, OnInit } from '@angular/core';
import { processedPackageUnits } from '@app/shared/_helpers/processed';

@Component({
  selector: 'app-product-packing-details',
  templateUrl: './product-packing-details.component.html',
  styleUrls: ['./product-packing-details.component.scss']
})
export class ProductPackingDetailsComponent implements OnInit {
  units = processedPackageUnits;

  constructor() {}

  ngOnInit() {}
}
