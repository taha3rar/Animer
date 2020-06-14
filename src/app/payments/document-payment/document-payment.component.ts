import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';

@Component({
  selector: 'app-document-payment',
  templateUrl: './document-payment.component.html',
  styleUrls: ['./document-payment.component.scss']
})
export class DocumentPaymentComponent implements OnInit {
  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.stepperService.stepperInit();
  }
}
