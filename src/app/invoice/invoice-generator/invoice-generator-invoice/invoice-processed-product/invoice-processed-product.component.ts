import { Component, OnInit } from '@angular/core';
import { processedPackageUnits } from '@app/shared/_helpers/processed';
import { currencies } from '@app/shared/_helpers/product_details';

@Component({
  selector: 'app-invoice-processed-product',
  templateUrl: './invoice-processed-product.component.html',
  styleUrls: ['./invoice-processed-product.component.scss']
})
export class InvoiceProcessedProductComponent implements OnInit {
  units = processedPackageUnits;
  currencies = currencies;
  constructor() {}

  ngOnInit() {}
}
