import { ActivatedRoute } from '@angular/router';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsReceivedNote, DPOWallet, RequestDPOPaymentDTO } from '@avenews/agt-sdk';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as libphonenumber from 'google-libphonenumber';
import { countries } from '@app/shared/helpers/countries';
import { PhoneNumberValidator } from '@app/core/validators/phone.validator';
declare const $: any;
@Component({
  selector: 'app-document-payment-details',
  templateUrl: './document-payment-details.component.html',
  styleUrls: ['./document-payment-details.component.scss'],
})
export class DocumentPaymentDetailsComponent extends BaseValidationComponent implements OnInit {
  @Input() grn: GoodsReceivedNote;
  @Output() paymentOutput = new EventEmitter<RequestDPOPaymentDTO>();
  signForm: FormGroup;
  wallet: DPOWallet;
  regionCode = 'KE';
  phoneCode: string;
  countries = countries;
  phoneUtil: any;
  partialPhoneNumber: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KE';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    this.route.data.subscribe((data) => {
      this.wallet = data['wallet'];
    });
    this.signForm = this.fb.group({
      fullName: [undefined, Validators.required],
      businessName: [undefined, Validators.required],
      phoneNumber: [undefined, PhoneNumberValidator(this.regionCode)],
    });
    this.formInput = this.signForm;
    setTimeout(function () {
      $('.select-picker').selectpicker();
      $('#region_code').selectpicker('refresh');
    }, 200);
  }
  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.signForm.patchValue({ phoneNumber: undefined });
      return;
    }
    this.signForm.patchValue({ phoneNumber: this.phoneUtil.format(phoneNumber, PNF.E164) });
  }
  isValid() {
    this.onSubmit(this.signForm);
    if (this.signForm.valid) {
      const payment: RequestDPOPaymentDTO = {
        amount: this.grn.total,
        goodsReceivedNote: this.grn,
        signedBy: this.signForm.value,
      };
      this.paymentOutput.emit(payment);
      $('#next-1').trigger('click');
    }
  }
  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='20' height='28'><span>\xa0\xa0${country}</span>`;
  }
  markAsTouched(formControl: string) {
    this.signForm.get(formControl).markAsTouched();
  }
}
