import { Component, OnInit, Injectable } from '@angular/core';
import swal from 'sweetalert';
import { saveAs as importedSaveAs } from 'file-saver';
import { BaseValidationComponent } from '../base-validation/base-validation.component';

export class DocumentDownloadComponent extends BaseValidationComponent {
  transaction: any;

  constructor(private service: any, private transactionRoute: any, private documentName: string) {
    super();
  }

  setTransaction(transaction: any) {
    this.transaction = transaction;
  }

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
        this.newTab('original');
      }
      if (value === 'copy') {
        this.newTab('copy');
      }
    });
  }

  // download(version: string): void {
  //   this.service.getPdf(this.transaction._id, version).subscribe((data: any) => {
  //     const blob = new Blob([data], { type: 'application/pdf' });
  //     importedSaveAs(blob, `${this.transactionRoute}-${this.transaction.numericId}-${version}`);
  //     swal.close();
  //   });
  // }

  newTab(version: string): void {
    if (this.transaction.pdf_location && this.transaction.pdf_location[version]) {
      window.open(this.transaction.pdf_location[version]);
      swal.close();
    } else {
      this.service.getPdf(this.transaction._id, version).subscribe((data: any) => {
        this.transaction.pdf_location = data.pdf_location || {};
        this.transaction.pdf_location[version] = data.pdf_location[version];
        window.open(this.transaction.pdf_location[version]);
        swal.close();
      });
    }
  }
}
