import { StepperService } from '@app/core/stepper.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Order } from '@app/core/models/order/order';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-generator-seller',
  templateUrl: './order-generator-seller.component.html',
  styleUrls: ['./order-generator-seller.component.scss']
})
export class OrderGeneratorSellerComponent implements OnInit {
  order: Order;
  document: any;
  invoiceForm: FormGroup;
  products: ProductInvoice[];
  invoice: Invoice;
  isDraft: Boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.isDraft = false;
    this.order = this.route.snapshot.data['order'];
    if (this.order) {
      this.document = this.order;
    }
    this.invoice = this.route.snapshot.data['invoice'];
    if (this.invoice) {
      this.isDraft = true;
      this.document = this.invoice;
    }
    this.products = this.document.products;
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
          phone_number: ['', Validators.required],
          contact_by: [this.formBuilder.array(this.document.buyer.contact_by)]
        })
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
          zipcode: ['', Validators.required],
          phone_number: ['', Validators.required],
          contact_by: [this.formBuilder.array(this.document.seller.contact_by)]
        })
      ],
      order_id: [Object.is(this.order, undefined) ? this.invoice.order_id : this.order._id, Validators.required],
      vat_amount: Object.is(this.invoice, undefined) ? 0 : this.invoice.vat_amount,
      vat_percentage: Object.is(this.invoice, undefined) ? 0 : this.invoice.vat_percentage,
      discount_amount: Object.is(this.invoice, undefined) ? 0 : this.invoice.discount_amount,
      discount_percentage: Object.is(this.invoice, undefined) ? 0 : this.invoice.discount_percentage,
      total_due: [this.document.total_due, Validators.required],
      subtotal: [
        Object.is(this.invoice, undefined) ? this.document.total_due : this.invoice.subtotal,
        Validators.required
      ],
      currency: [this.document.currency, Validators.required],
      payment_comments: this.document.payment_comments,
      order_comments: this.document.order_comments,
      sign_by: this.formBuilder.group({
        date: [this.document.sign_by.date, Validators.required],
        first_name: [this.document.sign_by.first_name, Validators.required],
        last_name: [this.document.sign_by.last_name, Validators.required],
        company_name: [this.document.sign_by.company_name, Validators.required]
      }),
      deliver_to: this.formBuilder.group({
        contact_name: [this.document.deliver_to.contact_name, Validators.required],
        address: [this.document.deliver_to.address, Validators.required],
        city: [this.document.deliver_to.city, Validators.required],
        zip_code: [this.document.deliver_to.zip_code, Validators.required],
        phone_number: [
          Object.is(this.order, undefined) ? this.invoice.deliver_to.phone_number : this.order.deliver_to.phone,
          Validators.required
        ],
        expected_delivery_date: [this.document.deliver_to.expected_delivery_date, Validators.required]
      }),
      date_created: [Date.now(), Validators.required]
    });

    this.invoiceForm.controls.seller.setValue(this.document.seller);
    this.invoiceForm.controls.buyer.setValue(this.document.buyer);
  }

  receiveNewInvoice($event: Invoice) {
    this.invoice = $event;
    this.invoice.buyer.contact_by = this.document.buyer.contact_by;
    this.invoice.seller.contact_by = this.document.seller.contact_by;
  }

  back() {
    this.location.back();
  }
}
