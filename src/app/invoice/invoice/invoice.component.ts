import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input()
  generateInvoice = false;

  @Input()
  invoice: Invoice;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.generateInvoice) {
      this.route.data.subscribe(({ invoice }) => {
        this.invoice = invoice;
      });
    }
  }

  back() {
    this.location.back();
  }

  disclaimerPopup() {
    swal({
      title: 'Disclaimer',
      text:
        'Buyers and Sellers may use the Company Digital Platform services, among others,' +
        ' to issue digital invoices to Buyers. The Company is not registered nor has it obtained ' +
        'approvals from the relevant tax authorities to provide such financial assistance services ' +
        'and is provides such services merely to assist the Buyer and Seller to execute their financial ' +
        'obligations through the Digital Platform. Therefore it is hereby clarified that the Companys in ' +
        'providing such services shall not be liable to the Buyer and/or Seller in the event the relevant tax ' +
        'authority does not recognise and/or accept the legality of such invoices issued by the Company on its ' +
        'Digital Platform and therefore, in such event, the Buyer and the Seller will be obligated to use other ' +
        'methods to execute their financial transaction and the Company shall not be liable in any manner to any ' +
        'cost, damages related directly or indirectly to the Buyer and/or Seller in respect to the above and the ' +
        'Buyer and Seller hereby waive any such claim against the Company.</p>'
    });
  }

  get issuer() {
    return this.invoice.seller;
  }

  get buyer() {
    return this.invoice.buyer;
  }

  get sign_by() {
    return this.invoice.sign_by;
  }

  get deliver_to() {
    return this.invoice.deliver_to;
  }
}
