import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
import { StepperService } from '@app/core/stepper.service';
import { Contact } from '@avenews/agt-sdk';
import { CreateGoodsReceivedNoteDTO } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Currency } from '@avenews/agt-sdk/lib/types/shared';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grn-first-step',
  templateUrl: './grn-first-step.component.html',
  styleUrls: ['./grn-first-step.component.scss']
})
export class GrnFirstStepComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  changed = false;
  @Input() grn: CreateGoodsReceivedNoteDTO;
  products: any[] = [];
  product: any;
  selectedContact: Contact;
  validator = {
    contact: false,
    date: false,
    products: false,
    rName: false,
    rBusiness: false,
    rPhone: false
  };
  currency: Currency;
  today = {
    year: 0,
    month: 0,
    day: 0
  };
  index = -1;

  constructor(private stepperService: StepperService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ contacts }) => {
      this.contacts = [...contacts];
    });
    this.stepperService.stepperInit();
    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
    if (localStorage.getItem('grnContact')) {
      this.selectedContact = JSON.parse(localStorage.getItem('grnContact'));
    }
    this.grn.total = 0;
  }

  change(e: Contact) {
    if (e) {
      this.selectedContact = e;
      this.changed = true;
      this.selectedContact ? $('#contact').removeClass('red-border') : (this.selectedContact = undefined);
    }
  }

  newContact(e: Contact) {
    this.selectedContact = e;
    localStorage.setItem('grnContact', JSON.stringify(e));
    this.router.navigate([this.router.url]);
  }

  compare(c1: any, c2: any): boolean {
    if (localStorage.getItem('grnContact') && !this.changed) {
      return c1.numericId === JSON.parse(localStorage.getItem('grnContact')).numericId;
    } else {
      return c1 === 'Select supplier';
    }
  }

  addProduct(e: any) {
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
    this.products.forEach(data => {
      sum += data.price;
    });
    this.grn.total = sum;
    this.products[0] ? $('#product-field').removeClass('red-border') : $('#product-field').addClass('red-border');
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
    this.today = e;
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
    if (this.grn.receivedBy.phoneNumber) {
      this.validator.rPhone = true;
    }
    return Object.values(this.validator).every(field => field);
  }

  markFields() {
    this.selectedContact ? $('#contact').removeClass('red-border') : $('#contact').addClass('red-border');
    this.grn.issueDate ? $('#date').removeClass('red-border') : $('#date').addClass('red-border');
    this.products[0] ? $('#product-field').removeClass('red-border') : $('#product-field').addClass('red-border');
    this.grn.receivedBy.name ? $('#name').removeClass('red-border') : $('#name').addClass('red-border');
    this.grn.receivedBy.businessName ? $('#business').removeClass('red-border') : $('#business').addClass('red-border');
    this.grn.receivedBy.phoneNumber ? $('#phone').removeClass('red-border') : $('#phone').addClass('red-border');
  }

  checkRec() {
    this.grn.receivedBy.name ? $('#name').removeClass('red-border') : $('#name').addClass('red-border');
    this.grn.receivedBy.businessName ? $('#business').removeClass('red-border') : $('#business').addClass('red-border');
    this.grn.receivedBy.phoneNumber ? $('#phone').removeClass('red-border') : $('#phone').addClass('red-border');
  }
}
