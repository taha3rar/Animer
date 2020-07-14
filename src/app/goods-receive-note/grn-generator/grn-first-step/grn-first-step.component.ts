import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var $: any;
import { StepperService } from '@app/core/stepper.service';
import { Contact, GoodsReceivedNoteProduct } from '@avenews/agt-sdk';
import { CreateGoodsReceivedNoteDTO } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Currency } from '@avenews/agt-sdk/lib/types/shared';
import * as libphonenumber from 'google-libphonenumber';
import { Router, ActivatedRoute } from '@angular/router';
import { countries } from '@app/shared/helpers/countries';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhoneNumberValidator } from '@app/core/validators/phone.validator';

@Component({
  selector: 'app-grn-first-step',
  templateUrl: './grn-first-step.component.html',
  styleUrls: ['./grn-first-step.component.scss'],
})
export class GrnFirstStepComponent extends BaseValidationComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  changed = false;
  regionCode = 'KE';
  phoneCode: string;
  phoneForm: FormGroup;
  countries = countries;
  phoneUtil: any;
  partialPhoneNumber: string;
  @Output() formDirty = new EventEmitter<boolean>();
  @Input() grn: CreateGoodsReceivedNoteDTO;
  products: any[] = [];
  product: GoodsReceivedNoteProduct = {
    currency: undefined,
    measurement: undefined,
    name: undefined,
    price: undefined,
    quantity: undefined,
    rate: undefined,
  };
  selectedContact: Contact;
  validator = {
    contact: false,
    date: false,
    products: false,
    rName: false,
    rBusiness: false,
    rPhone: false,
  };
  currency: Currency = null;
  today = {
    year: 0,
    month: 0,
    day: 0,
  };
  index = -1;

  constructor(
    private stepperService: StepperService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super();
    this.phoneForm = this.fb.group({
      phoneNumber: [undefined, PhoneNumberValidator(this.regionCode)],
    });
  }

  ngOnInit() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.regionCode = 'KE';
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    this.route.data.subscribe(({ contacts }) => {
      this.contacts = [...contacts];
    });
    this.stepperService.stepperInit();
    this.formInput = this.phoneForm;

    setTimeout(function () {
      $('.selectpicker').selectpicker();
      $('#region_code').selectpicker('refresh');
    }, 200);
    if (localStorage.getItem('grnContact')) {
      this.selectedContact = JSON.parse(localStorage.getItem('grnContact'));
    }
    this.grn.total = 0;
  }
  changeRegionCode() {
    this.phoneCode = this.phoneUtil.getCountryCodeForRegion(this.regionCode);
    const PNF = libphonenumber.PhoneNumberFormat;
    let phoneNumber;
    try {
      phoneNumber = this.phoneUtil.parse(this.partialPhoneNumber, this.regionCode);
    } catch (error) {
      this.phoneForm.patchValue({ phoneNumber: undefined });
      return;
    }
    this.phoneForm.patchValue({ phoneNumber: this.phoneUtil.format(phoneNumber, PNF.E164) });
    this.grn.receivedBy.phoneNumber = this.phoneForm.controls['phoneNumber'].value;
  }

  change(e: Contact) {
    if (e) {
      this.formDirty.emit(true);
      this.selectedContact = e;
      this.changed = true;
      this.selectedContact ? $('#contact').removeClass('red-border') : (this.selectedContact = undefined);
    }
  }

  newContact(e: Contact) {
    this.selectedContact = e;
    localStorage.setItem('grnContact', JSON.stringify(e));
    this.router.navigate([this.router.url]);
    this.formDirty.emit(true);
  }
  generateLink(code: any, country: any) {
    return `<img src='../../../assets/img/flags/${code}.png' height='20' height='28'><span>\xa0\xa0${country}</span>`;
  }
  markAsTouched(formControl: string) {
    this.phoneForm.get(formControl).markAsTouched();
  }
  compare(c1: any, c2: any): boolean {
    if (localStorage.getItem('grnContact') && !this.changed) {
      return c1.numericId === JSON.parse(localStorage.getItem('grnContact')).numericId;
    } else {
      return c1 === 'Select supplier';
    }
  }

  addProduct(e: any) {
    if (e) {
      this.formDirty.emit(true);
      if (!this.currency) {
        this.currency = e.product.currency;
      }
      if (e.i === -1) {
        this.products.push(e.product);
      } else {
        this.products[e.i] = e.product;
      }
      this.grn.products = this.products;
      let sum = 0;
      this.products.forEach((data) => {
        sum += data.price;
      });
      this.grn.total = sum;
      this.products[0] ? $('#product-field').removeClass('red-border') : $('#product-field').addClass('red-border');
    } else {
      this.product = null;
    }
  }
  newProduct() {
    function makeProduct(): GoodsReceivedNoteProduct {
      const product: GoodsReceivedNoteProduct = {
        currency: undefined,
        measurement: undefined,
        name: undefined,
        price: undefined,
        quantity: undefined,
        rate: undefined,
      };
      return product;
    }
    this.index = -1;
    this.product = null;
    this.product = makeProduct();
  }
  edit(i: number) {
    this.index = i;
    this.product = this.products[i];
  }

  validate() {
    this.markFields();
    if (this.checkForm()) {
      this.grn.supplier = this.selectedContact;
      this.grn.currency = this.currency;
    }
  }

  onDate(e: any) {
    this.today = {
      day: parseInt(e.split('/')[0], 10),
      month: parseInt(e.split('/')[1], 10),
      year: parseInt(e.split('/')[2], 10),
    };

    this.grn.issueDate = new Date(this.today.year, this.today.month - 1, this.today.day);
    this.grn.issueDate ? $('#date').removeClass('red-border') : $('#date').addClass('red-border');
  }

  checkForm(): boolean {
    if (this.selectedContact) {
      this.validator.contact = true;
    }
    if (this.products[0]) {
      this.validator.products = true;
    }
    if (this.grn.issueDate) {
      this.validator.date = true;
    }
    if (this.grn.receivedBy.name) {
      this.validator.rName = true;
    }
    if (this.grn.receivedBy.businessName) {
      this.validator.rBusiness = true;
    }
    if (this.phoneForm.valid) {
      this.validator.rPhone = true;
    }
    return Object.values(this.validator).every((field) => field);
  }

  markFields() {
    this.markAsTouched('phoneNumber');
    this.selectedContact ? $('#contact').removeClass('red-border') : $('#contact').addClass('red-border');
    this.grn.issueDate ? $('#date').removeClass('red-border') : $('#date').addClass('red-border');
    this.products[0] ? $('#product-field').removeClass('red-border') : $('#product-field').addClass('red-border');
    this.grn.receivedBy.name ? $('#name').removeClass('red-border') : $('#name').addClass('red-border');
    this.grn.receivedBy.businessName ? $('#business').removeClass('red-border') : $('#business').addClass('red-border');
  }

  checkRec() {
    this.grn.receivedBy.name ? $('#name').removeClass('red-border') : $('#name').addClass('red-border');
    this.grn.receivedBy.businessName ? $('#business').removeClass('red-border') : $('#business').addClass('red-border');
  }
}
