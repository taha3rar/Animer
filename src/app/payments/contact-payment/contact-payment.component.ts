import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StepperService } from '@app/core/forms/stepper.service';
import { Contact } from '@avenews/agt-sdk';

@Component({
  selector: 'app-contact-payment',
  templateUrl: './contact-payment.component.html',
  styleUrls: ['./contact-payment.component.scss']
})
export class ContactPaymentComponent implements OnInit {
  constructor(private router: Router, private stepperService: StepperService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.stepperService.stepperInit();
  }

  back() {
    this.router.navigate(['payments']);
  }
}
