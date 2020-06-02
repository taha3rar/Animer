import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-document',
  templateUrl: './payment-document.component.html',
  styleUrls: ['./payment-document.component.scss']
})
export class PaymentDocumentComponent implements OnInit {
  isPayment = true;

  constructor() {}

  ngOnInit() {}
}
