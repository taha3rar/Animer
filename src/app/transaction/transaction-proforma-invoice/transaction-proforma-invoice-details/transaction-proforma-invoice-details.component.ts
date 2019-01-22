import { Component, OnInit, Input } from '@angular/core';
import { certifications, currencies } from '@app/shared/_helpers/product_details';
import { incotermsGroups } from '@app/shared/_helpers/incoterms';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { packageUnits, containerType } from '@app/shared/_helpers/packaging_details';

@Component({
  selector: 'app-transaction-proforma-invoice-details',
  templateUrl: './transaction-proforma-invoice-details.component.html',
  styleUrls: ['./transaction-proforma-invoice-details.component.scss']
})
export class TransactionProformaInvoiceDetailsComponent implements OnInit {
  @Input()
  proformaInvoice: ProformaInvoice;

  piForm: FormGroup;
  allCerts = certifications;
  units = packageUnits;
  incotermsGroups = incotermsGroups;
  currencies = currencies;
  containerTypes = containerType;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.proformaInvoice.expected_delivering_date);
    this.piForm = this.formBuilder.group({
      tolerance: [this.proformaInvoice.tolerance, Validators.required],
      approvals: [this.formBuilder.array([Validators.required])],
      container_type: [this.proformaInvoice.container_type, Validators.required],
      container_quantity: [this.proformaInvoice.container_quantity, Validators.required],
      type_of_package: [this.proformaInvoice.type_of_package, Validators.required],
      package_weight: [this.proformaInvoice.package_weight, Validators.required],
      weight_unit: [this.proformaInvoice.package_weight_unit, Validators.required],
      quantity: [this.proformaInvoice.quantity, Validators.required],
      address_origin: [this.proformaInvoice.point_of_loading, Validators.required],
      incoterms: [this.proformaInvoice.incoterms],
      pricing_weight_unit: [this.proformaInvoice.package_weight_unit, Validators.required],
      currency: [this.proformaInvoice.currency, Validators.required],
      price_per_unit: [this.proformaInvoice.price_per_unit, Validators.required],
      additional_pricing_details: [this.proformaInvoice.pricing_details, Validators.required],
      valid_until: ['', Validators.required],
      delivery_date: [this.proformaInvoice.expected_delivering_date, Validators.required],
      remarks: ['']
    });
  }
}
