import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';
import { InvoiceService } from '@app/core/api/invoice.service';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Product } from '@app/core/models/product';
import { ProductService } from '@app/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  disclaimerAccepted: boolean;
  @Input()
  generateInvoice = false;

  @Input()
  invoice: Invoice;

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.disclaimerAccepted = false;
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
        'Buyer and Seller hereby waive any such claim against the Company',
      buttons: [false, 'I agree']
    }).then(value => {
      if (value) {
        this.disclaimerAccepted = true;
      }
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

  download(): void {
    html2canvas(document.getElementById('pdfContent'), { windowWidth: 900, windowHeight: 1000 }).then(canvas => {
      const pdf = new jspdf('p', 'mm', 'a4');
      const img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'PNG', 0, 0, 208, 300);
      pdf.save(`invoice-${this.invoice.numericId}.pdf`);
    });
  }

  saveInvoice(): void {
    if (this.disclaimerAccepted === false) {
      this.disclaimerPopup();
    } else {
      this.invoiceService.create(this.invoice).subscribe((invoice: Invoice) => {
        for (let i = 0; i < this.invoice.products.length; i++) {
          if (this.invoice.products[i].to_inventory) {
            const product = this.invoice.products[i].toProduct(invoice);
            this.productService.create(product).subscribe();
          }
        }
        this.router.navigateByUrl('/invoice/list');
      });
    }
  }
}
