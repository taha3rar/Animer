import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Invoice } from '@app/core/models/invoice/invoice';
import { ActivatedRoute } from '@angular/router';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['./invoice-generator.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit {
  invoice: Invoice;
  invoiceForm: FormGroup;

  constructor(private location: Location, private route: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit() {
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
          zipcode: ['', Validators.required],
          phone_number: ['', Validators.required],
          contact_by: [this.formBuilder.array([], Validators.required)]
        }),
        this.userIdValidator()
      ],
      personal_po_id: '',
      payment_comments: '',
      order_comments: '',
      valid_until: ['', Validators.required],
      sign_by_first_name: ['', Validators.required],
      sign_by_last_name: ['', Validators.required],
      sign_by_company_name: ['', Validators.required],
      deliver_to_contact_name: ['', Validators.required],
      deliver_to_address: ['', Validators.required],
      deliver_to_city: ['', Validators.required],
      deliver_to_zip_code: ['', Validators.required],
      deliver_to_phone_number: ['', Validators.required],
      deliver_to_expected_delivery_date: ['', Validators.required],
      date_created: [Date.now(), Validators.required],
      products: this.formBuilder.array([], Validators.required)
    });

    this.route.data.subscribe(({ seller }) => {
      this.invoiceForm.controls.seller.setValue(this.getSmallSeller(seller));
    });
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
      zipcode: seller.company_information.zipcode,
      phone_number: seller.personal_information.phone_number,
      contact_by: seller.contact_by
    };
  }

  back() {
    this.location.back();
  }
}
