import { Component, OnInit, Input } from '@angular/core';
import { certifications, currencies } from '@app/shared/_helpers/product_details';
import { measureUnits } from '@app/shared/_helpers/measure';
import { incotermsGroups } from '@app/shared/_helpers/incoterms';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  proformaInvoice: ProformaInvoice;
  allCerts = certifications;
  units = measureUnits;
  incotermsGroups = incotermsGroups;
  currencies = currencies;
  constructor() {}

  ngOnInit() {}
}
