import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { ActivatedRoute, Router } from '@angular/router';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';
import { User } from '@app/core/models/order/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Quotation } from '@app/core/models/quotation/quotation';

@Component({
  selector: 'app-quotation-generator',
  templateUrl: './quotation-generator.component.html',
  styleUrls: ['./quotation-generator.component.scss']
})
export class QuotationGeneratorComponent implements OnInit {
  quotationForm: FormGroup;
  quoteRequest: QuoteRequest;
  quotation: Quotation = new Quotation();
  buyer: any;
  seller: User;

  constructor(
    private stepperService: StepperService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.seller = this.getSmallSeller(this.route.snapshot.data['seller']);
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.buyer = this.quoteRequest.buyer;
    this.quotationForm = this.formBuilder.group({
      buyer: this.formBuilder.group({
        _id: this.buyer ? this.buyer._id : undefined,
        numericId: this.buyer ? this.buyer.numericId : undefined,
        first_name: [this.buyer ? this.buyer.first_name : undefined, Validators.required],
        last_name: [this.buyer ? this.buyer.last_name : undefined, Validators.required],
        email: [this.buyer ? this.buyer.email : undefined, [Validators.required]],
        company_name: [this.buyer ? this.buyer.company_name : undefined],
        address: [this.buyer ? this.buyer.address : undefined],
        city: [this.buyer ? this.buyer.city : undefined],
        zipcode: [this.buyer ? this.buyer.zipcode : undefined],
        country: [this.buyer ? this.buyer.country : undefined],
        phone_number: [this.buyer ? this.buyer.phone_number : undefined],
        contact_by: [this.formBuilder.array(this.buyer.contact_by || [])]
      }),
      seller: this.formBuilder.group({
        _id: this.seller ? this.seller._id : undefined,
        numericId: this.seller ? this.seller.numericId : undefined,
        first_name: [this.seller ? this.seller.first_name : undefined, Validators.required],
        last_name: [this.seller ? this.seller.last_name : undefined, Validators.required],
        email: [this.seller ? this.seller.email : undefined, [Validators.required]],
        company_name: [this.seller ? this.seller.company_name : undefined],
        address: [this.seller ? this.seller.address : undefined],
        city: [this.seller ? this.seller.city : undefined],
        zipcode: [this.seller ? this.seller.zipcode : undefined],
        country: [this.seller ? this.seller.country : undefined],
        phone_number: [this.seller ? this.seller.phone_number : undefined],
        contact_by: [this.formBuilder.array(this.seller.contact_by || [])]
      }),
      quote_request: this.formBuilder.group({
        _id: [this.quoteRequest._id, Validators.required]
      }),
      buyer_comments: [this.quoteRequest.buyer_comments],
      seller_comments: [undefined],
      total_price: [undefined, Validators.required],
      currency: [this.quoteRequest.currency, Validators.required],
      valid_by: [this.quoteRequest.valid_by],
      date_created: [moment(Date.now()).toJSON(), Validators.required]
    });
    this.quotation = this.quotationForm.value;
    this.quotation.buyer.contact_by = this.quotationForm.value.buyer.contact_by.value;
    this.quotation.seller.contact_by = this.quotationForm.value.seller.contact_by.value;
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

  receiveQuotation(quotation: Quotation) {
    this.quotation = quotation;
  }

  back() {
    this.router.navigateByUrl('/quote-request');
  }
}
