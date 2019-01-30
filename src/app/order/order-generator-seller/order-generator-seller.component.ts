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
  invoiceForm: FormGroup;
  products: ProductInvoice[];
  invoice: Invoice;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.order = this.route.snapshot.data['order'];
    this.products = this.order.products;
    this.invoiceForm = this.formBuilder.group({
      buyer: [
        this.formBuilder.group({
          _id: [this.order.buyer._id, Validators.required],
          numericId: [this.order.buyer.numericId, Validators.required],
          first_name: [this.order.buyer.first_name, Validators.required],
          last_name: [this.order.buyer.last_name, Validators.required],
          email: [this.order.buyer.email, [Validators.required, Validators.email]],
          company_name: [this.order.buyer.company_name, Validators.required],
          company_number: [this.order.buyer.company_number, Validators.required],
          address: [this.order.buyer.address, Validators.required],
          city: [this.order.buyer.city, Validators.required],
          zipcode: [this.order.buyer.zipcode, Validators.required],
          phone_number: [this.order.buyer.phone_number, Validators.required],
          contact_by: [this.formBuilder.array(this.order.buyer.contact_by)]
        })
      ],
      seller: [
        this.formBuilder.group({
          _id: [this.order.seller._id, Validators.required],
          numericId: [this.order.seller.numericId, Validators.required],
          first_name: [this.order.seller.first_name, Validators.required],
          last_name: [this.order.seller.last_name, Validators.required],
          email: [this.order.seller.email, [Validators.required, Validators.email]],
          company_name: [this.order.seller.company_name, Validators.required],
          company_number: [this.order.seller.company_number],
          address: [this.order.seller.address],
          city: [this.order.seller.city],
          zipcode: [this.order.seller.zipcode],
          phone_number: [this.order.seller.phone_number, Validators.required],
          contact_by: [this.formBuilder.array(this.order.seller.contact_by)]
        })
      ],
      order_id: [this.order._id, Validators.required],
      vat_amount: 0,
      vat_percentage: 0,
      discount_amount: 0,
      discount_percentage: 0,
      total_due: [this.order.total_due, Validators.required],
      subtotal: [this.order.total_due, Validators.required],
      currency: [this.order.currency, Validators.required],
      payment_comments: this.order.payment_comments,
      order_comments: this.order.order_comments,
      sign_by: this.formBuilder.group({
        date: [this.order.sign_by.date, Validators.required],
        first_name: [this.order.sign_by.first_name, Validators.required],
        last_name: [this.order.sign_by.last_name, Validators.required],
        company_name: [this.order.sign_by.company_title, Validators.required]
      }),
      deliver_to: this.formBuilder.group({
        contact_name: [this.order.deliver_to.contact_name, Validators.required],
        address: [this.order.deliver_to.address, Validators.required],
        city: [this.order.deliver_to.city, Validators.required],
        zip_code: [this.order.deliver_to.zip_code, Validators.required],
        phone_number: [this.order.deliver_to.phone, Validators.required],
        expected_delivery_date: [this.order.deliver_to.expected_delivery_date, Validators.required]
      }),
      date_created: [Date.now(), Validators.required]
    });
  }

  receiveNewInvoice($event: Invoice) {
    this.invoice = $event;
    this.invoice.buyer.contact_by = this.order.buyer.contact_by;
    this.invoice.seller.contact_by = this.order.seller.contact_by;
  }

  back() {
    this.location.back();
  }
}
