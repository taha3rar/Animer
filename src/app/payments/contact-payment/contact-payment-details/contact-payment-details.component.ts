import { ErrorService } from './../../../core/error.service';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, DPOWallet, RequestDPOPaymentDTO, Utils } from '@avenews/agt-sdk';
import { StepperService } from '@app/core/stepper.service';
import { Signature } from '@avenews/agt-sdk/lib/types/shared';
import Swal from 'sweetalert2';
import * as libphonenumber from 'google-libphonenumber';
import { countries } from '@app/shared/helpers/countries';
import { PhoneNumberValidator } from '@app/core/validators/phone.validator';
declare const $: any;

@Component({
  selector: 'app-contact-payment-details',
  templateUrl: './contact-payment-details.component.html',
  styleUrls: ['./contact-payment-details.component.scss'],
})
export class ContactPaymentDetailsComponent extends BaseValidationComponent implements OnInit {
  @Input() payment: RequestDPOPaymentDTO;
  @Output() payUp = new EventEmitter();
  contacts: Contact[];
  contact: Contact;
  countries = countries;
  phoneUtil: any;
  amount = 0;
  regionCode = 'KE';
  phoneCode: string;
  partialPhoneNumber: string;
  paymentForm: FormGroup;
  selectedContact: Contact;
  wallet: DPOWallet;
  constructor(
    private stepperService: StepperService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {
    super();
    this.paymentForm = this.fb.group({
      name: [undefined, Validators.required],
      businessName: [undefined, Validators.required],
      phoneNumber: [undefined, PhoneNumberValidator(this.regionCode)],
      amount: [undefined, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.stepperService.stepperInit();
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KE';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    this.route.data.subscribe(({ contacts, wallet }) => {
      this.contacts = [...contacts];
      this.wallet = wallet;
    });
    this.formInput = this.paymentForm;

    setTimeout(function () {
      $('.select-picker').selectpicker();
      $('#region_code').selectpicker('refresh');
    }, 200);
  }
  newContact(contact: any) {
    this.contacts.push(contact);
    this.refresh();
    this.contact = contact;
  }
  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.paymentForm.patchValue({ phoneNumber: undefined });
      return;
    }
    this.paymentForm.patchValue({ phoneNumber: this.phoneUtil.format(phoneNumber, PNF.E164) });
  }
  refresh() {
    setTimeout(function () {
      $('.select-picker').selectpicker('refresh');
    }, 200);
  }
  checkForm() {
    !this.contact ? $('.select-picker').addClass('red-border') : $('.select-picker').removeClass('red-border');
    this.onSubmit(this.paymentForm);
    if (this.canSubmit && this.lowBalance) {
      Swal.fire({
        title: 'LOW BALANCE',
        text:
          'Your payment amount is higher than your balance amount. please top-up your balance to complete this payment',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Top-up your balance',
        showCancelButton: true,
        // tslint:disable-next-line: quotemark
        cancelButtonText: "i'll do it later",
        customClass: {
          actions: 'actions',
          confirmButton: 'top-up bttn bttn-primary',
          cancelButton: 'later',
        },
      }).then((val) => {
        setTimeout(() => {
          // wait for the sweet alert to dismiss then show this 200ms
          if (val && val.value) {
            $('.hidden').click();
          }
        }, 200);
      });
    }
    if (this.canSubmit && !this.lowBalance) {
      this.submit();
    }
  }
  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='20' height='28'><span>\xa0\xa0${country}</span>`;
  }
  markAsTouched(formControl: string) {
    this.paymentForm.get(formControl).markAsTouched();
  }
  get canSubmit(): boolean {
    return (
      // tslint:disable: triple-equals
      this.contact != undefined && this.paymentForm.valid
    );
  }
  get lowBalance() {
    return this.amount >= this.wallet.available;
  }
  get paymentF() {
    return this.paymentForm.controls;
  }
  submit() {
    this.onSubmit(this.paymentForm);
    if (this.canSubmit && this.amount > 0) {
      if (!Utils.validateDPOPhoneNumber(this.contact.phoneNumber)) {
        const err = {
          title: 'Phone number error',
          body:
            'Sorry, the online payment system currently supports payments to recipients with a Kenyan phone number only',
        };
        this.errorService.phoneError(err);
      } else {
        const request: RequestDPOPaymentDTO = {
          signedBy: {
            name: this.paymentF.name.value,
            businessName: this.paymentF.businessName.value,
            phoneNumber: this.paymentF.phoneNumber.value,
            countryPhoneCode: '+' + this.phoneCode,
          },
          amount: this.amount,
          contact: this.contact,
        };
        this.payUp.emit(request);
        $('#next').trigger('click');
      }
    }
  }
}
