import { AlertsService } from './../../core/alerts.service';
import { SdkService } from './../../core/sdk.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperService } from '@app/core/forms/stepper.service';
import { Contact, RequestDPOPaymentDTO } from '@avenews/agt-sdk';

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
      this.alerts.showAlert('Your Payment request has been sent.\n\n\n\n\n simple alert not final');
    } catch (error) {
      this.alerts.showAlertDanger('There has been an error');
    }
  }
}
