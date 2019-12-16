import { AlertsService } from './../../core/alerts.service';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '@app/core/api/invoice.service';
import { saveAs as importedSaveAs } from 'file-saver';
import swal from 'sweetalert';
import { DocumentDownloadComponent } from '@app/shared/components/document-download/document-download.component';
@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent extends DocumentDownloadComponent implements OnInit, OnChanges {
  @Input()
  invoice: Invoice;
  @Input()
  generateInvoice: false;
  @Output() formSubmitted = new EventEmitter();
  payableInvoice = false;
  constructor(private invoiceService: InvoiceService, private router: Router, private alerts: AlertsService) {
    super(invoiceService, 'invoice', 'Invoice');
  }

  ngOnInit() {}

  ngOnChanges() {
    super.setTransaction(this.invoice);
  }

  saveInvoice(): void {
    this.disableSubmitButton(true);
    this.formSubmitted.emit(true);
    this.invoiceService.create(this.invoice).subscribe(
      data => {
        this.alerts.showAlert('Your proforma invoice has been sent!');
        this.router.navigateByUrl('/order');
      },
      err => {
        this.disableSubmitButton(false);
      }
    );
  }
}
