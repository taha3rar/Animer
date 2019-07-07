import { StepperService } from '@app/core/stepper.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Invoice } from '@app/core/models/invoice/invoice';
import { ActivatedRoute, Router } from '@angular/router';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { CanComponentDeactivate } from '@app/shared/guards/confirmation.guard';
import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['./invoice-generator.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit, CanComponentDeactivate {
  invoice: Invoice;
  draftInvoice: Invoice;
  draft: boolean;
  invoiceProducts: ProductInvoice[];
  invoiceForm: FormGroup;
  formSubmitted: any;
  isDraft: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.draft = false;
    this.draftInvoice = this.route.snapshot.data['invoice'];
    if (this.draftInvoice) {
      this.draft = true;
      this.invoiceProducts = this.draftInvoice.products;
    }
    this.invoiceForm = this.formBuilder.group({
      buyer: [
        this.formBuilder.group({
          _id: ['', Validators.required],
          numericId: ['', Validators.required],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          company_name: ['', Validators.required],
          company_number: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          zipcode: ['', Validators.required],
          country: ['', Validators.required],
          phone_number: ['', Validators.required],
          contact_by: [this.formBuilder.array([], Validators.required)]
        }),
        this.userIdValidator()
      ],
      seller: [
        this.formBuilder.group({
          _id: ['', Validators.required],
          numericId: ['', Validators.required],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          company_name: ['', Validators.required],
          company_number: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          zipcode: ['', Validators.required],
          phone_number: ['', Validators.required],
          contact_by: [this.formBuilder.array([], Validators.required)]
        }),
        this.userIdValidator()
      ],
      _id: Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice._id,
      personal_po_id: Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.personal_po_id,
      vat_amount: Object.is(this.draftInvoice, undefined) ? 0 : this.draftInvoice.vat_amount,
      vat_percentage: Object.is(this.draftInvoice, undefined) ? 0 : this.draftInvoice.vat_percentage,
      discount_amount: Object.is(this.draftInvoice, undefined) ? 0 : this.draftInvoice.discount_amount,
      discount_percentage: Object.is(this.draftInvoice, undefined) ? 0 : this.draftInvoice.discount_percentage,
      total_due: [Object.is(this.draftInvoice, undefined) ? 0 : this.draftInvoice.total_due, Validators.required],
      subtotal: [Object.is(this.draftInvoice, undefined) ? 0 : this.draftInvoice.subtotal, Validators.required],
      currency: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.currency, Validators.required],
      payment_comments: Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.payment_comments,
      order_comments: Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.order_comments,
      sign_by: this.formBuilder.group({
        date: [
          Object.is(this.draftInvoice, undefined)
            ? undefined
            : {
                day: moment(this.draftInvoice.sign_by.date).day(),
                month: moment(this.draftInvoice.sign_by.date).month() + 1,
                year: moment(this.draftInvoice.sign_by.date).year()
              },
          Validators.required
        ],
        first_name: [
          Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.sign_by.first_name,
          Validators.required
        ],
        last_name: [
          Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.sign_by.last_name,
          Validators.required
        ],
        company_name: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.sign_by.company_name]
      }),
      deliver_to: this.formBuilder.group({
        contact_name: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.deliver_to.contact_name],
        address: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.deliver_to.address],
        city: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.deliver_to.city],
        zip_code: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.deliver_to.zip_code],
        phone_number: [Object.is(this.draftInvoice, undefined) ? undefined : this.draftInvoice.deliver_to.phone_number],
        expected_delivery_date: [
          Object.is(this.draftInvoice, undefined)
            ? undefined
            : {
                day: moment(this.draftInvoice.deliver_to.expected_delivery_date).day(),
                month: moment(this.draftInvoice.deliver_to.expected_delivery_date).month() + 1,
                year: moment(this.draftInvoice.deliver_to.expected_delivery_date).year()
              }
        ]
      }),
      date_created: [
        Object.is(this.draftInvoice, undefined)
          ? undefined
          : {
              day: moment(this.draftInvoice.date_created).day(),
              month: moment(this.draftInvoice.date_created).month() + 1,
              year: moment(this.draftInvoice.date_created).year()
            },
        Validators.required
      ]
    });

    if (!this.draftInvoice) {
      this.route.data.subscribe(({ seller }) => {
        this.invoiceForm.controls.seller.setValue(this.getSmallSeller(seller));
      });
    } else {
      this.invoiceForm.controls.buyer.setValue(this.draftInvoice.buyer);
      this.invoiceForm.controls.seller.setValue(this.draftInvoice.seller);
    }
    this.stepperService.stepperInit();
  }

  @HostListener('window:beforeunload')
  CanDeactivate(): boolean {
    return !this.invoiceForm.dirty;
  }

  receiveNewInvoice($event: Invoice) {
    this.invoice = $event;
  }

  userIdValidator(): ValidatorFn {
    return (user: AbstractControl): { [key: string]: any } | null => {
      return user.value._id ? null : { buyerRequired: true };
    };
  }

  getSmallSeller(seller: BigUser.User): SmallUser.User {
    return {
      _id: seller._id,
      numericId: seller.numericId,
      first_name: seller.personal_information.first_name,
      last_name: seller.personal_information.last_name,
      email: seller.email,
      company_name: seller.company_information.company_name,
      company_number: seller.company_information.company_registered_number,
      address: seller.company_information.street,
      city: seller.company_information.city,
      country: seller.company_information.country,
      zipcode: seller.company_information.zipcode,
      phone_number: seller.personal_information.phone_number,
      contact_by: seller.contact_by
    };
  }

  confirm() {
    if (!this.invoiceForm.dirty || this.formSubmitted || this.isDraft) {
      return true;
    }
    return swal({
      text: 'Are you sure you want to leave this page? All information will be lost!',
      buttons: ['Cancel', 'Yes'],
      icon: 'warning'
    }).then(value => {
      if (value) {
        return true;
      } else {
        return false;
      }
    });
  }

  back() {
    this.router.navigateByUrl('/invoice/list');
  }

  newDraftInvoice(recievedValue: any) {
    this.isDraft = recievedValue;
  }
}
