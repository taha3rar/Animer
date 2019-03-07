import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '@app/core/api/invoice.service';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  @Input()
  invoice: Invoice;
  @Input()
  generateInvoice: false;

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit() {}

  saveInvoice(): void {
    this.invoiceService.create(this.invoice).subscribe(data => {
      this.router.navigateByUrl('/order/list');
    });
  }
}
