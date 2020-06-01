import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-payment-activation',
  templateUrl: './payment-activation.component.html',
  styleUrls: ['./payment-activation.component.scss']
})
export class PaymentActivationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onModalClose() {
    $('#topUpBalance').fadeOut('fast');
  }

  onPaymentSubmit() {
    this.onModalClose();
    Swal.fire({
      icon: 'success',
      title: 'TOP-UP REQUEST SENT!',
      text: 'A DPO agent will be in touch with you soon to complete the top-up process.'
    });
  }
}
