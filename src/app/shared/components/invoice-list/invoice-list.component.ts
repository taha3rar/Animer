import { CsvService } from './../../services/csv.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { AuthenticationService, InvoiceService } from '@app/core';
import { Router } from '@angular/router';
import { BaseListComponent } from '../base-list/base-list.component';
import 'hammerjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends BaseListComponent implements OnInit {
  @Input()
  exportInit: boolean;
  @Input()
  invoices: Invoice[];
  @Input()
  viewAsSeller: boolean;
  page = 1;
  invoicesToExport: any[] = [];
  @Output() invoicesList = new EventEmitter();
  checkedAll = false;
  measurementUnitConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This proforma invoice includes products with more than one measurement unit, for more information please click on the blue VIEW button on the right side of the row';
  processedProductConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This proforma invoice includes only processed products, for more information please click on the blue VIEW button on the right side of the row';

  constructor(
    private authService: AuthenticationService,
    protected invoiceService: InvoiceService,
    protected router: Router,
    private csv: CsvService
  ) {
    super(invoiceService, router, {
      deleteText: 'Once deleted, you will not be able to recover this invoice!'
    });
  }

  ngOnInit() {}

  get userId() {
    return this.authService.currentUserId;
  }

  existInvoice(invoice: any) {
    return this.invoicesToExport.indexOf(invoice) > -1;
  }

  toggleInvoiceSelect(invoice: any) {
    const idx = this.invoicesToExport.indexOf(invoice);
    if (idx > -1) {
      this.invoicesToExport.splice(idx, 1);
      this.checkedAll = false;
    } else {
      this.invoicesToExport.push(invoice);
    }
    this.invoicesList.emit(this.invoicesToExport);
  }

  exportAllRecords(event: any) {
    this.invoicesToExport = [];
    for (const invoice of this.invoices) {
      this.invoicesToExport.push(invoice);
    }
    if (!event.target.checked) {
      this.invoicesToExport = [];
    }
    this.invoicesList.emit(this.invoicesToExport);
    this.checkedAll = true;
  }

  hasProcessedProduct(invoice: Invoice) {
    for (let i = 0; i < invoice.products.length; i++) {
      if (invoice.products[i].product_type === 'processed') {
        return true;
      }
    }
    return false;
  }
}
