import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { CsvService } from '@app/shared/services/csv.service';
import { DatePipe, DecimalPipe } from '@angular/common';

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
  viewAsSeller = false;
  viewAsBuyer = false;
  viewAsAgri = true;
  exportInit = false;
  agribusinessUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private csvService: CsvService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.agribusinessUser = this.authService.isAgribusiness;
    this.route.data.subscribe(({ invoices, invoicesAsBuyer, invoicesAsSeller }) => {
      this.invoices = invoices;
      this.allInvoices = invoices;
      this.buyerInvoices = invoicesAsBuyer;
      this.sellerInvoices = invoicesAsSeller;
    });
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    this.viewAsAgri = false;
    if (profileType === 'seller') {
      this.viewAsSeller = true;
      this.invoices = this.sellerInvoices;
    } else if (profileType === 'buyer') {
      this.viewAsBuyer = true;
      this.invoices = this.buyerInvoices;
    } else {
      this.viewAsAgri = true;
      this.invoices = this.allInvoices;
    }
  }

  initExport() {
    if (this.exportInit === false) {
      this.exportInit = true;
    } else {
      this.exportInit = false;
    }
  }

  exportAll() {
    // TODO: Find a better way to do this, should be done in the shared component because the stuff to show is decided there

    const headers = {
      id: 'ID',
      issuedAt: 'Issued at',
      issuedFor: 'Issued for',
      signedBy: 'Signed by',
      totalDue: 'Total due',
      status: 'Status'
    };

    const invoices = this.invoices.map((invoice: Invoice) => {
      const issuedFor =
        this.authService.currentUserId === invoice.seller._id
          ? invoice.buyer.company_name
          : invoice.seller.company_name;

      const signedBy =
        this.authService.currentUserId === invoice.seller._id
          ? `${invoice.buyer.first_name} ${invoice.buyer.last_name}`
          : `${invoice.seller.first_name} ${invoice.seller.last_name}`;

      return {
        id: invoice.numericId,
        issuedAt: this.datePipe.transform(invoice.date_created, 'dd/MM/yyyy'),
        issuedFor: issuedFor,
        signedBy: signedBy,
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
    return 'Here you can see all your invoices that have been sent to you!'; // TODO: Change based on the current user role
  }
}
