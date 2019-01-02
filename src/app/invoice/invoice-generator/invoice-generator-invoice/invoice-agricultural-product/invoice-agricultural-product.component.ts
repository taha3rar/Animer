import { currencies } from './../../../../shared/_helpers/product_details';
import { Component, OnInit } from '@angular/core';
import { processedPackageUnits } from '@app/shared/_helpers/processed';

@Component({
  selector: 'app-invoice-agricultural-product',
  templateUrl: './invoice-agricultural-product.component.html',
  styleUrls: ['./invoice-agricultural-product.component.scss']
})
export class InvoiceAgriculturalProductComponent implements OnInit {
  units = processedPackageUnits;
  currencies = currencies;
  constructor() {}

  ngOnInit() {}
}
