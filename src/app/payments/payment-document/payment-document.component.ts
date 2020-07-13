import { Router } from '@angular/router';
import { ErrorService } from './../../core/error.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RequestDPOPaymentDTO, Utils, AGTError } from '@avenews/agt-sdk';

@Component({
  selector: 'app-payment-document',
  templateUrl: './payment-document.component.html',
  styleUrls: ['./payment-document.component.scss'],
})
export class PaymentDocumentComponent implements OnInit {
  @Input() isPayment = true;
  @Input() payment: RequestDPOPaymentDTO;
  @Output() pay = new EventEmitter<boolean>();
  today = new Date();
  constructor(private err: ErrorService, private router: Router) {}

  ngOnInit() {}
  sendPayment() {
    const error = {
      title: 'Phone number error',
      body:
        'Sorry, the online payment system currently supports payments to recipients with a Kenyan phone number only',
    };
    if (this.payment.contact && this.payment.contact.fullName) {
      if (!Utils.validateDPOPhoneNumber(this.payment.contact.phoneNumber)) {
        this.err.phoneError(error).then((data) => {
          if (data) {
            this.router.navigate(['/payments']);
          }
        });
      } else { this.pay.emit(true); }
    } else if (this.payment.goodsReceivedNote && this.payment.goodsReceivedNote.supplier.fullName) {
      if (!Utils.validateDPOPhoneNumber(this.payment.goodsReceivedNote.supplier.phoneNumber)) {
        this.err.phoneError(error).then((data) => {
          if (data) {
            this.router.navigate(['/payments']);
          }
        });
      }
    } else {
      this.pay.emit(true);
    }
  }
}
