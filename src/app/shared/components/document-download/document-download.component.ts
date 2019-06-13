import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-document-download',
  template: ''
})
export class DocumentDownloadComponent implements OnInit {
  service: any;
  transaction: any;
  transactionRoute: any;
  documentName: string;

  constructor() {}

  ngOnInit() {}

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of ' + this.documentName + ' document you would like to download:',
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

  download(version: string): void {
    this.service.getPdf(this.transaction._id, version).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      importedSaveAs(blob, `${this.transactionRoute}-${this.transaction.numericId}-${version}`);
      swal.close();
    });
  }
}
