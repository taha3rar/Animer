import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { certifications, currencies } from '@app/shared/helpers/product_details';
import { incotermsGroups } from '@app/shared/helpers/incoterms';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { packageUnits, containerType } from '@app/shared/helpers/packaging_details';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-proforma-invoice-details',
  templateUrl: './transaction-proforma-invoice-details.component.html',
  styleUrls: ['./transaction-proforma-invoice-details.component.scss']
})
export class TransactionProformaInvoiceDetailsComponent implements OnInit {
  @Input()
  proformaInvoice: ProformaInvoice;
  @Output()
  piReadyEvent = new EventEmitter<boolean>();

  piForm: FormGroup;
  allCerts = certifications;
  units = packageUnits;
  incotermsGroups = incotermsGroups;
  currencies = currencies;
  containerTypes = containerType;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.piForm = this.formBuilder.group({
      sku: [this.proformaInvoice.stock_keeping_unit],
      tolerance: [this.proformaInvoice.tolerance, Validators.required],
      approvals: [this.formBuilder.array([])],
      container_type: [this.proformaInvoice.container_type],
      container_quantity: [this.proformaInvoice.container_quantity],
      type_of_package: [this.proformaInvoice.type_of_package, Validators.required],
      package_weight: [this.proformaInvoice.package_weight, Validators.required],
      weight_unit: [this.proformaInvoice.package_weight_unit, Validators.required],
      quantity: [this.proformaInvoice.quantity, Validators.required],
      total_weight: [this.proformaInvoice.total_weight, Validators.required],
      address_origin: [this.proformaInvoice.point_of_loading, Validators.required],
      gps_origin: [this.proformaInvoice.gps_coordinates_loading, Validators.required],
      incoterms: [this.proformaInvoice.incoterms],
      pricing_weight_unit: [this.proformaInvoice.package_weight_unit, Validators.required],
      total_price: [this.proformaInvoice.total_price, Validators.required],
      currency: [this.proformaInvoice.currency, Validators.required],
      price_per_unit: [this.proformaInvoice.price_per_unit, Validators.required],
      additional_pricing_details: [this.proformaInvoice.pricing_details],
      valid_until: ['', Validators.required],
      delivery_date: [moment(this.proformaInvoice.expected_delivering_date).format('DD/MM/YY'), Validators.required],
      remarks: ['']
    });
  }

  get pif() {
    return this.piForm.controls;
  }

  review() {
    this.proformaInvoice.remarks = this.pif.remarks.value;
    this.proformaInvoice.stock_keeping_unit = this.pif.sku.value;
    this.proformaInvoice.tolerance = this.pif.tolerance.value;
    this.proformaInvoice.certifications = this.pif.approvals.value;
    this.proformaInvoice.container_quantity = this.pif.container_quantity.value;
    this.proformaInvoice.container_type = this.pif.container_type.value;
    this.proformaInvoice.type_of_package = this.pif.type_of_package.value;
    this.proformaInvoice.package_weight = this.pif.package_weight.value;
    this.proformaInvoice.package_weight_unit = this.pif.weight_unit.value;
    this.proformaInvoice.quantity = this.pif.quantity.value;
    this.proformaInvoice.total_weight = this.pif.total_weight.value;
    this.proformaInvoice.total_price = this.pif.total_price.value;
    this.proformaInvoice.point_of_loading = this.pif.address_origin.value;
    this.proformaInvoice.gps_coordinates_loading = this.pif.gps_origin.value;
    this.proformaInvoice.incoterms = this.pif.incoterms.value;
    this.proformaInvoice.pricing_weight_unit = this.pif.pricing_weight_unit.value;
    this.proformaInvoice.currency = this.pif.currency.value;
    this.proformaInvoice.price_per_unit = this.pif.price_per_unit.value;
    this.proformaInvoice.pricing_details = this.pif.additional_pricing_details.value;
    this.proformaInvoice.expected_delivering_date = moment(this.pif.delivery_date.value).toJSON();
    this.proformaInvoice.valid_until = moment(this.pif.valid_until.value).toJSON();

    this.piReadyEvent.emit(true);
  }
}