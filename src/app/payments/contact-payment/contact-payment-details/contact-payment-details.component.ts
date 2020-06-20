import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, DPOWallet, RequestDPOPaymentDTO } from '@avenews/agt-sdk';
import { StepperService } from '@app/core/stepper.service';
import { Signature } from '@avenews/agt-sdk/lib/types/shared';
declare const $: any;

@Component({
  selector: 'app-contact-payment-details',
  templateUrl: './contact-payment-details.component.html',
  styleUrls: ['./contact-payment-details.component.scss']
})
export class ContactPaymentDetailsComponent extends BaseValidationComponent implements OnInit {
  @Input() payment: RequestDPOPaymentDTO;
  @Output() payUp = new EventEmitter();
  contacts: Contact[];
  contact: Contact;
  paymentForm: FormGroup;
  selectedContact: Contact;
  wallet: DPOWallet;
  constructor(
    private stepperService: StepperService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super();
    this.paymentForm = this.fb.group({
      name: [undefined, Validators.required],
      businessName: [undefined, Validators.required],
      phoneNumber: [undefined, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.stepperService.stepperInit();
    this.route.data.subscribe(({ contacts, wallet }) => {
      this.contacts = [...contacts];
      this.wallet = wallet;
      this.paymentForm.controls['amount'].setValidators([
        Validators.max(wallet.available),
        Validators.required,
        Validators.min(1)
      ]);
      this.paymentForm.controls['amount'].updateValueAndValidity();
    });
    this.formInput = this.paymentForm;

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
    !this.contact ? $('.select-picker').addClass('red-border') : $('.select-picker').removeClass('red-border');
    this.onSubmit(this.paymentForm);
  }
  get canSubmit(): boolean {
    return (
      // tslint:disable: triple-equals
      this.contact != undefined && this.paymentForm.valid
    );
  }
  get paymentF() {
    return this.paymentForm.controls;
  }
  submit() {
    this.onSubmit(this.paymentForm);
    if (this.canSubmit) {
      const request: RequestDPOPaymentDTO = {
        signedBy: {
          name: this.paymentF.name.value,
          businessName: this.paymentF.businessName.value,
          phoneNumber: this.paymentF.phoneNumber.value
        },
        amount: this.paymentF.amount.value,
        contact: this.contact
      };
      this.payUp.emit(request);
    }
  }
}
