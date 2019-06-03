import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import swal from 'sweetalert';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.scss']
})
export class QuotationViewComponent implements OnInit {
  @Input() isGenerator = false;
  @Input() isView = false;
  @Input() quotation: Quotation;
  @Input() quoteRequest: QuoteRequest;

  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of quotation document you would like to download:',
      buttons: {
        originalDoc: { text: 'Original Document', value: 'original', className: 'swal-button-o', closeModal: false },
        copyDoc: { text: 'Copy Document', value: 'copy', closeModal: false }
      }
    }).then(value => {
      if (value === 'original') {
      } else {
      }
    });
  }
}
