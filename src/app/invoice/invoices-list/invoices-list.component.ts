import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Invoice } from '@app/core/models/invoice/invoice';

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

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {
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

  get userId() {
    return this.authService.currentUserId;
  }

  get helpLegend() {
    return 'Here you can see all your invoices that have been sent to you!'; // TODO: Change based on the current user role
  }
}
