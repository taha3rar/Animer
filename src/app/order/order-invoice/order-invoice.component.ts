import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '@app/core/api/invoice.service';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  @Input()
  invoice: Invoice;
  @Input()
  generateInvoice: Invoice;

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit() {}

  download(): void {
    html2canvas(document.getElementById('pdfContent'), { windowWidth: 900, windowHeight: 1000 }).then(canvas => {
      const pdf = new jspdf('p', 'mm', 'a4');
      const img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'PNG', 0, 0, 208, 300);
      pdf.save(`invoice-${this.invoice.numericId}.pdf`);
    });
  }

  saveInvoice(): void {
    this.invoiceService.create(this.invoice).subscribe(data => {
      this.router.navigateByUrl('/order/list');
    });
  }
}
