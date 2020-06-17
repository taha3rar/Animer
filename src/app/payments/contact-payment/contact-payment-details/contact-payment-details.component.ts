import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, DPOWallet, RequestDPOPaymentDTO } from '@avenews/agt-sdk';
import { StepperService } from '@app/core/stepper.service';
declare const $: any;

@Component({
  selector: 'app-contact-payment-details',
  templateUrl: './contact-payment-details.component.html',
  styleUrls: ['./contact-payment-details.component.scss']
})
export class ContactPaymentDetailsComponent implements OnInit {
  @Input() payment: RequestDPOPaymentDTO;
  @Output() payUp = new EventEmitter();
  contacts: Contact[];
  contact: Contact;
  selectedContact: Contact;
  amount = 0;
  wallet: DPOWallet;
  signed_by: {
    fullName: string;
    businessName: string;
    phoneNumber: string;
  } = { fullName: '', businessName: '', phoneNumber: '' };
  constructor(private stepperService: StepperService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.route.data.subscribe(({ contacts, wallet }) => {
      this.contacts = [...contacts];
      this.wallet = wallet;
    });
    setTimeout(function() {
      $('.select-picker').selectpicker();
    }, 200);
  }
  newContact(contact: any) {
    this.contacts.push(contact);
    this.refresh();
    this.contact = contact;
  }

  refresh() {
    setTimeout(function() {
      $('.select-picker').selectpicker('refresh');
    }, 200);
  }
  checkForm() {
    !this.signed_by.fullName ? $('#name').addClass('red-border') : $('#name').removeClass('red-border');
    !this.signed_by.businessName ? $('#business').addClass('red-border') : $('#business').removeClass('red-border');
    !this.signed_by.phoneNumber ? $('#phone').addClass('red-border') : $('#phone').removeClass('red-border');
    !this.contact ? $('.select-picker').addClass('red-border') : $('.select-picker').removeClass('red-border');
    this.amount <= 0 || this.amount > this.wallet.available
      ? $('#amount').addClass('red-border')
      : $('#amount').removeClass('red-border');
  }
  removeRed() {
    // tslint:disable no-unused-expression
    this.signed_by.fullName ? $('#name').removeClass('red-border') : '';
    this.signed_by.businessName ? $('#business').removeClass('red-border') : '';
    this.signed_by.phoneNumber ? $('#phone').removeClass('red-border') : '';
    this.contact ? $('.select-picker').removeClass('red-border') : '';
    this.amount > 0 && this.amount <= this.wallet.available ? $('#amount').removeClass('red-border') : '';
  }
  get canSubmit(): boolean {
    return (
      // tslint:disable: triple-equals
      this.signed_by &&
      this.signed_by.fullName != undefined &&
      this.signed_by.businessName != undefined &&
      this.signed_by.phoneNumber != undefined &&
      this.amount != undefined &&
      this.amount <= this.wallet.available &&
      this.amount >= 1 &&
      this.contact != undefined
    );
  }
  submit() {
    if (this.canSubmit) {
      const request: RequestDPOPaymentDTO = {
        signedBy: {
          name: this.signed_by.fullName,
          businessName: this.signed_by.businessName,
          phoneNumber: this.signed_by.phoneNumber
        },
        amount: this.amount,
        contact: this.contact
      };
      this.payUp.emit(request);
    }
  }
}
