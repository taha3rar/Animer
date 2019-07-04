import { AlertsService } from './../../core/alerts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '@app/core/api/invoice.service';
import { saveAs as importedSaveAs } from 'file-saver';
import swal from 'sweetalert';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent extends BaseValidationComponent implements OnInit {
  @Input()
  invoice: Invoice;
  @Input()
  generateInvoice: false;
  @Output() formSubmitted = new EventEmitter();

  constructor(private invoiceService: InvoiceService, private router: Router, private alerts: AlertsService) {
    super();
  }

  ngOnInit() {}

  saveInvoice(): void {
    this.disableSubmitButton(true);
    this.formSubmitted.emit(true);
    this.invoiceService.create(this.invoice).subscribe(
      data => {
        this.alerts.showAlert('Your proforma invoice has been sent!');
        this.router.navigateByUrl('/order/list');
      },
      err => {
        this.disableSubmitButton(false);
      }
    );
  }

  download(version: string): void {
    this.invoiceService.getPdf(this.invoice._id, version).subscribe(data => {
      const blob = new Blob([data], { type: 'application/pdf' });
      importedSaveAs(blob, `invoice-${this.invoice.numericId}-${version}`);
      swal.close();
    });
  }

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of proforma invoice document you would like to download:',
      buttons: {
        originalDoc: { text: 'Original Document', value: 'original', className: 'swal-button-o', closeModal: false },
        copyDoc: { text: 'Copy Document', value: 'copy', closeModal: false }
      }
    }).then(value => {
      if (value === 'original') {
        this.download('original');
      } else {
        this.download('copy');
      }
    });
  }
}
