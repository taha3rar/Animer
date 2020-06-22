import { AlertsService } from './../../core/alerts.service';
import { SdkService } from './../../core/sdk.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperService } from '@app/core/forms/stepper.service';
import { Contact, RequestDPOPaymentDTO } from '@avenews/agt-sdk';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-payment',
  templateUrl: './contact-payment.component.html',
  styleUrls: ['./contact-payment.component.scss']
})
export class ContactPaymentComponent implements OnInit {
  payment: RequestDPOPaymentDTO = {
    amount: 0,
    signedBy: undefined
  };
  constructor(
    private router: Router,
    private sdkService: SdkService,
    private stepperService: StepperService,
    private alerts: AlertsService
  ) {}
  ngOnInit() {
    this.stepperService.stepperInit();
  }

  back() {
    this.router.navigate(['payments']);
  }
  pay(e: RequestDPOPaymentDTO) {
    this.payment = e;
  }
  async sendPayment() {
    try {
      const data = await this.sdkService.submitPayment(this.payment);
      Swal.fire({
        icon: 'success',
        title:
          'Payment has been succesfully sent. We will let you know once it is approved.\n This may take up to 48 hours '
      }).then(val => {
        if (val) {
          this.router.navigateByUrl('payments');
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'There was an error while trying to send your payment'
      });
    }
  }
}
