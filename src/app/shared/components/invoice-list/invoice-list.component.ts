import { CsvService } from './../../services/csv.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { AuthenticationService, InvoiceService } from '@app/core';
import { Router } from '@angular/router';
import { BaseListComponent } from '../base-list/base-list.component';
import 'hammerjs';
import { Sort } from '@angular/material/sort';

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
  @Input()
  searchTerm: string;
  page = 1;
  invoicesToExport: any[] = [];
  @Output() invoicesList = new EventEmitter();
  checkedAll = false;
  hasInvoices: Boolean;
  measurementUnitConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This proforma invoice includes products with more than one measurement unit, for more information please click on the blue VIEW button on the right side of the row';
  processedProductConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This proforma invoice includes only processed products, for more information please click on the blue VIEW button on the right side of the row';

  constructor(
    protected authService: AuthenticationService,
    protected invoiceService: InvoiceService,
    protected router: Router,
    private csv: CsvService
  ) {
    super(invoiceService, router, {
      deleteText: 'Once deleted, you will not be able to recover this invoice!',
      pageName: 'invoices'
    });
  }

  ngOnInit() {
    this.hasInvoices = this.invoices.length > 0;
  }

  sortData(sort: Sort) {
    const data = this.invoices.slice();
    if (!sort.active || sort.direction === '') {
      this.invoices = data;
      return;
    }

    this.invoices = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'issuedOn':
          return super.compare(a.date_created, b.date_created, isAsc);
        case 'issuedFor':
          return super.compare(a.buyer.first_name + a.buyer.last_name, b.buyer.first_name + b.buyer.last_name, isAsc);
        case 'issuedBy':
          return super.compare(
            a.seller.first_name + a.seller.last_name,
            b.seller.first_name + b.seller.last_name,
            isAsc
          );
        case 'signedBy':
          return super.compare(
            a.sign_by.first_name + a.sign_by.last_name,
            b.sign_by.first_name + b.sign_by.last_name,
            isAsc
          );
        case 'amount':
          return super.compare(a.total_weight, b.total_weight, isAsc);
        case 'totalDue':
          return super.compare(a.total_due, b.total_due, isAsc);
        case 'status':
          return super.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  get canDelete() {
    // delete ability is only allowed for specific users
    return this.usersWhiteList.includes(this.authService.credentials.user.email);
  }

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
