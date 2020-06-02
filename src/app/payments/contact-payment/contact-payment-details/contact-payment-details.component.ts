import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '@avenews/agt-sdk';
import { StepperService } from '@app/core/stepper.service';
declare var $: any;

@Component({
  selector: 'app-contact-payment-details',
  templateUrl: './contact-payment-details.component.html',
  styleUrls: ['./contact-payment-details.component.scss']
})
export class ContactPaymentDetailsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  selectedContact: Contact;

  constructor(private stepperService: StepperService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.route.data.subscribe(({ contacts }) => {
      this.contacts = [...contacts];
    });
    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }
}
