import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { OrderDataService } from './order-data.service';
import { ActivatedRoute } from '@angular/router';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';
import { StepperService } from '@app/core/stepper.service';

@Component({
  selector: 'app-order-generator',
  templateUrl: './order-generator.component.html',
  styleUrls: ['./order-generator.component.scss']
})
export class OrderGeneratorComponent implements OnInit {
  term: any;
  orderForm: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private orderDataService: OrderDataService,
    private route: ActivatedRoute,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.orderForm = this.formBuilder.group({
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
        }),
        this.userIdValidator()
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
        }),
        this.userIdValidator()
      ],
      subtotal: [0, Validators.required],
      currency: [undefined, Validators.required],
      payment_comments: undefined,
      order_comments: undefined,
      sign_by: this.formBuilder.group({
        date: [undefined, Validators.required],
        first_name: [undefined, Validators.required],
        last_name: [undefined, Validators.required],
        company_name: [undefined, Validators.required]
      }),
      deliver_to: this.formBuilder.group({
        contact_name: [undefined, Validators.required],
        address: [undefined, Validators.required],
        city: [undefined, Validators.required],
        zip_code: [undefined, Validators.required],
        phone_number: [undefined, Validators.required],
        expected_delivery_date: [undefined, Validators.required]
      }),
      date_created: [Date.now(), Validators.required]
    });
    this.route.data.subscribe(({ buyer }) => {
      this.orderForm.controls.buyer.setValue(this.getSmallBuyer(buyer));
      this.orderDataService.setForm(this.orderForm);
    });
  }

  userIdValidator(): ValidatorFn {
    return (user: AbstractControl): { [key: string]: any } | null => {
      return user.value._id ? null : { sellerRequired: true };
    };
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
