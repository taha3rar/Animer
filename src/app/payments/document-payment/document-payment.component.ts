import { Router } from '@angular/router';
import { SpinnerToggleService } from '@app/shared/services/spinner-toggle.service';
import { SdkService } from '@app/core/sdk.service';
import { GoodsReceivedNote, RequestDPOPaymentDTO } from '@avenews/agt-sdk';
import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document-payment',
  templateUrl: './document-payment.component.html',
  styleUrls: ['./document-payment.component.scss'],
})
export class DocumentPaymentComponent implements OnInit {
  grn: GoodsReceivedNote;
  payment: RequestDPOPaymentDTO;
  constructor(
    private stepperService: StepperService,
    private sdkService: SdkService,
    private spinner: SpinnerToggleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
  }
  async sendPayment() {
    this.spinner.showSpinner();
    try {
      const data = await this.sdkService.submitPayment(this.payment);
      this.spinner.hideSpinner();
      Swal.fire({
        icon: 'success',
        title:
          'Payment has been succesfully sent. We will let you know once it is approved.\n This may take up to 48 hours ',
      }).then((val) => {
        if (val) {
          this.router.navigateByUrl('payments');
        }
      });
    } catch (error) {
      this.spinner.hideSpinner();
      Swal.fire({
        icon: 'error',
        title: 'There was an error while trying to send your payment',
      });
    }
  }
}
