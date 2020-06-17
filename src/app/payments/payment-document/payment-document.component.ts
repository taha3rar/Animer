import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RequestDPOPaymentDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-payment-document',
  templateUrl: './payment-document.component.html',
  styleUrls: ['./payment-document.component.scss']
})
export class PaymentDocumentComponent implements OnInit {
  @Input() isPayment = true;
  @Input() payment: RequestDPOPaymentDTO;
  @Output() pay = new EventEmitter<boolean>();
  today = new Date();
  constructor() {}

  ngOnInit() {}
  sendPayment() {
    this.pay.emit(true);
  }
}
