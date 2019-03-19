import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { CsvService } from '@app/shared/services/csv.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Product } from '@app/core/models/product';
declare const $: any;

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {
  invoices: Invoice[];
  allInvoices: Invoice[];
  buyerInvoices: Invoice[];
  sellerInvoices: Invoice[];
  invoicesToExport: any[] = [];
  viewAsSeller = false;
  viewAsBuyer = false;
  viewAsAgri = true;
  exportInit = false;
  agribusinessUser: boolean;
  sellerUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private csvService: CsvService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private csv: CsvService
  ) {}

  ngOnInit() {
    this.agribusinessUser = this.authService.isAgribusiness;
    this.sellerUser = this.authService.isSeller;
    this.route.data.subscribe(({ invoices, invoicesAsBuyer, invoicesAsSeller }) => {
      this.invoices = invoices;
      this.allInvoices = invoices;
      this.buyerInvoices = invoicesAsBuyer;
      this.sellerInvoices = invoicesAsSeller;
      if (this.agribusinessUser || this.sellerUser) {
        this.viewAs('seller');
      } else {
        this.viewAs('buyer');
      }
    });
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    this.viewAsAgri = false;
    if (profileType === 'seller') {
      this.viewAsSeller = true;
      this.invoices = this.sellerInvoices;
    } else {
      this.viewAsBuyer = true;
      this.invoices = this.buyerInvoices;
    }
  }

  initExport() {
    if (this.exportInit === false) {
      this.exportInit = true;
      $('.dropdown button span').html('Select Proforma Invoices');
    } else {
      this.exportInit = false;
      $('.dropdown button span').html('Actions');
    }
  }

  exportAll() {
    // TODO: Find a better way to do this, should be done in the shared component because the stuff to show is decided there

    const headers = {
      id: 'ID',
      issuedAt: 'Issued at',
      issuedFor: 'Issued for',
      signedBy: 'Signed by',
      product: 'Product',
      amount: 'Amount',
      totalDue: 'Total due',
      status: 'Status'
    };

    const invoices = this.invoices.map((invoice: Invoice) => {
      const issuedFor =
        this.authService.currentUserId === invoice.seller._id
          ? `${invoice.buyer.first_name} ${invoice.buyer.last_name}`
          : `${invoice.seller.first_name} ${invoice.seller.last_name}`;

      const signedBy =
        invoice.sign_by.first_name && invoice.sign_by.last_name
          ? `${invoice.sign_by.first_name} ${invoice.sign_by.last_name}`
          : 'N/A';

      let product;
      if (invoice.products.length > 0) {
        if (invoice.products.length === 1) {
          product =
            invoice.products[0].product_type === 'processed'
              ? `${invoice.products[0].produce}`
              : `${invoice.products[0].produce} / ${invoice.products[0].variety}`;
        } else {
          product = 'Multiple products';
        }
      } else {
        product = 'N/A';
      }

      const amount = invoice.total_weight
        ? invoice.document_weight_unit
          ? `${this.decimalPipe.transform(invoice.total_weight, '1.2-2')} ${invoice.document_weight_unit || ''}`
          : 'N/A'
        : 'N/A';

      return {
        id: invoice.numericId,
        issuedAt: this.datePipe.transform(invoice.date_created, 'dd/MM/yyyy'),
        issuedFor: issuedFor,
        signedBy: signedBy,
        product: product,
        amount: amount,
        totalDue: `${this.decimalPipe.transform(invoice.total_due, '1.2-2')} ${invoice.currency}`,
        status: invoice.status
      };
    });

    this.csvService.generateAndDownload(invoices, headers, 'proforma_invoices');
  }

  get userId() {
    return this.authService.currentUserId;
  }

  get helpLegend() {
    if (this.authService.isAgribusiness) {
      // tslint:disable-next-line:max-line-length
      return 'Generate, review and distribute stand-alone proforma invoices, which are proforma invoices that are not connected directly to a purchase order you received from a buyer on the platform.';
    } else if (this.authService.isBuyer) {
      // tslint:disable-next-line:max-line-length
      return 'Review, download, and manage all of the proforma invoices submitted by your sellers in one place.';
    } else if (this.authService.isSeller) {
      // tslint:disable-next-line:max-line-length
      return 'Generate, review and distribute stand-alone proforma invoices, which are proforma invoices that are not connected directly to a purchase order you received from a buyer on the platform.';
    }

    return '';
  }

  downloadCsvForPayment() {
    this.csv.getInvoicesForPayment(this.invoicesToExport);
    this.exportInit = false;
    this.invoicesToExport = [];
    $('.dropdown button span').html('Actions');
  }
}
