import { Component, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-topup-modal',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.scss']
})
export class TopupComponent {
  @Output() balanceSubmit = new EventEmitter<number>();
  balance: number;
  constructor() {}
  onModalClose() {
    $('#topUpBalance').fadeOut('fast');
  }

  onPaymentSubmit() {
    if (this.balance >= 1) {
      this.onModalClose();
      Swal.fire({
        icon: 'success',
        title: 'TOP-UP REQUEST SENT!',
        text: 'A DPO agent will be in touch with you soon to complete the top-up process.'
      });
      this.balanceSubmit.emit(this.balance);
    }
  }
  checkValidity() {
    this.balance < 1 ? $('#balance').addClass('red-border') : $('#balance').removeClass('red-border');
  }
}
