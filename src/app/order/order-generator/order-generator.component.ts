import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { OrderDataService } from './order-data.service';
import { ActivatedRoute } from '@angular/router';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';
import { StepperService } from '@app/core/stepper.service';
import { Order } from '@app/core/models/order/order';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

@Component({
  selector: 'app-order-generator',
  templateUrl: './order-generator.component.html',
  styleUrls: ['./order-generator.component.scss']
})
export class OrderGeneratorComponent implements OnInit {
  term: any;
  orderForm: FormGroup;
  draftOrder: Order;
  isDraft: Boolean;
  draftProducts: ProductInvoice[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private orderDataService: OrderDataService,
    private route: ActivatedRoute,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.isDraft = false;
    this.draftOrder = this.route.snapshot.data['order'];
    if (this.draftOrder) {
      this.isDraft = true;
      this.draftProducts = this.draftOrder.products;
      this.orderDataService.setProductList(this.draftProducts);
    } else {
      this.draftOrder = new Order();
    }
    this.orderForm = this.formBuilder.group({
      _id: Object.is(this.draftOrder, undefined) ? undefined : this.draftOrder._id,
      numericId: Object.is(this.draftOrder, undefined) ? undefined : this.draftOrder.numericId,
      buyer: [
        this.formBuilder.group({
          _id: [undefined, Validators.required],
          numericId: [undefined, Validators.required],
          first_name: [undefined, Validators.required],
          last_name: [undefined, Validators.required],
          email: [undefined, [Validators.required, Validators.email]],
          company_name: [undefined, Validators.required],
          company_number: [undefined, Validators.required],
          address: [undefined, Validators.required],
          city: [undefined, Validators.required],
          zipcode: [undefined, Validators.required],
          phone_number: [undefined, Validators.required],
          contact_by: [this.formBuilder.array([], Validators.required)]
        })
      ],
      seller: [
        this.formBuilder.group({
          _id: [undefined, Validators.required],
          numericId: [undefined, Validators.required],
          first_name: [undefined, Validators.required],
          last_name: [undefined, Validators.required],
          email: [undefined, [Validators.required, Validators.email]],
          company_name: [undefined, Validators.required],
          company_number: [undefined, Validators.required],
          address: [undefined, Validators.required],
          city: [undefined, Validators.required],
          zipcode: [undefined, Validators.required],
          phone_number: [undefined, Validators.required],
          contact_by: [this.formBuilder.array([], Validators.required)]
        })
      ],
      subtotal: [Object.is(this.draftOrder, undefined) ? 0 : this.draftOrder.subtotal, Validators.required],
      currency: [Object.is(this.draftOrder, undefined) ? undefined : this.draftOrder.currency, Validators.required],
      payment_comments: this.draftOrder.payment_comments,
      order_comments: this.draftOrder.order_comments,
      sign_by: this.formBuilder.group({
        date: [Object.is(this.sign_by, undefined) ? '' : this.sign_by.date, Validators.required],
        first_name: [Object.is(this.sign_by, undefined) ? '' : this.sign_by.first_name, Validators.required],
        last_name: [Object.is(this.sign_by, undefined) ? '' : this.sign_by.last_name, Validators.required],
        company_name: [Object.is(this.sign_by, undefined) ? '' : this.sign_by.company_name, Validators.required]
      }),
      deliver_to: this.formBuilder.group({
        contact_name: [Object.is(this.deliver_to, undefined) ? '' : this.deliver_to.contact_name, Validators.required],
        address: [Object.is(this.deliver_to, undefined) ? '' : this.deliver_to.address, Validators.required],
        city: [Object.is(this.deliver_to, undefined) ? '' : this.deliver_to.city, Validators.required],
        zip_code: [Object.is(this.deliver_to, undefined) ? '' : this.deliver_to.zip_code, Validators.required],
        phone: [Object.is(this.deliver_to, undefined) ? '' : this.deliver_to.phone, Validators.required],
        expected_delivery_date: [
          Object.is(this.deliver_to, undefined) ? '' : this.deliver_to.expected_delivery_date,
          Validators.required
        ]
      }),
      date_created: [Date.now(), Validators.required]
    });
    if (!this.isDraft) {
      this.route.data.subscribe(({ buyer }) => {
        this.orderForm.controls.buyer.setValue(this.getSmallBuyer(buyer));
        this.orderDataService.setForm(this.orderForm);
      });
    } else {
      this.orderForm.controls.buyer.setValue(this.draftOrder.buyer);
      this.orderForm.controls.seller.setValue(this.draftOrder.seller);
      this.orderDataService.setForm(this.orderForm);
    }
  }

  get sign_by() {
    return this.draftOrder.sign_by;
  }

  get deliver_to() {
    return this.draftOrder.deliver_to;
  }

  getSmallBuyer(seller: BigUser.User): SmallUser.User {
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
      zipcode: seller.company_information.zipcode,
      phone_number: seller.personal_information.phone_number,
      contact_by: seller.contact_by
    };
  }

  back() {
    this.location.back();
  }
}
