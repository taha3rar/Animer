import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.component.html'
})
export class QuoteRequestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of quote request document you would like to download:',
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
