import { Router } from '@angular/router';
import { SdkService } from './../../../core/sdk.service';
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
  constructor(private sdkService: SdkService, private router: Router) {}
  onModalClose() {
    $('#topUpBalance').fadeOut('fast');
  }

  async onPaymentSubmit() {
    if (this.balance >= 1) {
      try {
        const data = await this.sdkService.submitTopupRequest(this.balance);
        console.log(data);
        if (data.owner) {
          this.onModalClose();
          Swal.fire({
            icon: 'success',
            title: 'TOP-UP REQUEST SENT!',
            text: 'A DPO agent will be in touch with you soon to complete the top-up process.'
          });
          this.balanceSubmit.emit(this.balance);
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'TOP-UP REQUEST ERROR!',
          text: 'There was an error with your request.'
        });
      }
    }
  }
  checkValidity() {
    this.balance < 1 ? $('#balance').addClass('red-border') : $('#balance').removeClass('red-border');
  }
}
