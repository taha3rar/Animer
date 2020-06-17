import { DPOTransaction } from '@avenews/agt-sdk';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-document',
  templateUrl: './payment-document.component.html',
  styleUrls: ['./payment-document.component.scss']
})
export class PaymentDocumentComponent implements OnInit {
  @Input() isPayment = true;
  @Input() transaction: DPOTransaction;
  constructor() {}

  ngOnInit() {}
}
