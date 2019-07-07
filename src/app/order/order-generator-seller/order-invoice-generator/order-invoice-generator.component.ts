import { AlertsService } from './../../../core/alerts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '@app/core/api/invoice.service';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { DocumentGeneratorComponent } from '@app/shared/components/document-generator/document-generator.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-invoice-generator',
  templateUrl: './order-invoice-generator.component.html',
  styleUrls: ['./order-invoice-generator.component.scss']
})
export class OrderInvoiceGeneratorComponent extends DocumentGeneratorComponent implements OnInit {
  newInvoice: Invoice;
  @Input()
  form: FormGroup;
  @Input()
  products: ProductInvoice[];
  @Output()
  newInvoiceEvent = new EventEmitter<Invoice>();
  @Output()
  newDraftInvoice = new EventEmitter();
  validBy: NgbDateStruct;
  issuedOn: NgbDateStruct;

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private router: Router,
    private alerts: AlertsService
  ) {
    super(dialog);
  }

  ngOnInit() {
    this.onChanges();
    this.formInput = this.form;
    this.validBy = this.formInput.value.sign_by.date;
    this.issuedOn = this.formInput.value.date_created;
  }

  onChanges(): void {
    this.form.get('vat_percentage').valueChanges.subscribe(val => {
      this.applyVat();
    });
    this.form.get('discount_percentage').valueChanges.subscribe(val => {
      this.applyDiscount();
    });
  }

  get invoice() {
    return this.form.controls;
  }

  get seller() {
    return this.form.controls.seller.value;
  }

  get buyer() {
    return this.form.controls.buyer.value;
  }

  updateTotalDue(newSubtotal: number): void {
    this.invoice['subtotal'].setValue(this.invoice.subtotal.value + newSubtotal);
    this.applyVat();
  }

  applyVat(): void {
    this.invoice['vat_amount'].setValue((this.invoice.vat_percentage.value / 100) * this.invoice.subtotal.value);
    this.applyDiscount();
  }

  applyDiscount(): void {
    this.invoice['discount_amount'].setValue(
      (this.invoice.discount_percentage.value / 100) * (this.invoice.vat_amount.value + this.invoice.subtotal.value)
    );
    this.invoice['total_due'].setValue(
      this.invoice.subtotal.value + this.invoice.vat_amount.value - this.invoice.discount_amount.value
    );
  }

  draftInvoice() {
    this.disableSubmitButton(true);
    if (this.validBy) {
      this.invoice['sign_by'].patchValue({
        date: new Date(this.validBy.year, this.validBy.month - 1, this.validBy.day)
      });
    }
    this.issuedOn
      ? this.form.patchValue({ date_created: new Date(this.issuedOn.year, this.issuedOn.month - 1, this.issuedOn.day) })
      : this.form.patchValue({ date_created: Date.now() });
    this.newDraftInvoice.emit(true);
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newInvoice.draft = true;
    this.invoiceService.draft(this.newInvoice).subscribe(
      () => {
        this.alerts.showAlert('Your proforma invoice has been saved as a draft!');
        this.router.navigateByUrl('/order/list');
      },
      err => {
        this.disableSubmitButton(false);
      }
    );
  }

  toReview() {
    if (this.validBy) {
      this.invoice['sign_by'].patchValue({
        date: new Date(this.validBy.year, this.validBy.month - 1, this.validBy.day)
      });
    }
    this.issuedOn
      ? this.form.patchValue({ date_created: new Date(this.issuedOn.year, this.issuedOn.month - 1, this.issuedOn.day) })
      : this.form.patchValue({ date_created: Date.now() });
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newInvoiceEvent.emit(this.newInvoice);
  }
}
