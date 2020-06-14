import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-document-payment-documents',
  templateUrl: './document-payment-documents.component.html',
  styleUrls: ['./document-payment-documents.component.scss']
})
export class DocumentPaymentDocumentsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onChooseDocument(id: number) {
    $('#doc-row' + id).trigger('click');
  }
}
