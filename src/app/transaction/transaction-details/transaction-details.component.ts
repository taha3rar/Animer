import { Component, OnInit } from '@angular/core';
import { certifications, currencies } from '@app/shared/_helpers/product_details';
import { measureUnits } from '@app/shared/_helpers/measure';
import { incotermsGroups } from '@app/shared/_helpers/incoterms';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  allCerts = certifications;
  units = measureUnits;
  incotermsGroups = incotermsGroups;
  currencies = currencies;
  constructor() {}

  ngOnInit() {}
}
