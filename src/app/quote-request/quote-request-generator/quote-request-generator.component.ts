import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { User } from '@app/core/models/order/user';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { QuoteRequestDataService } from './quote-request-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-request-generator',
  templateUrl: './quote-request-generator.component.html',
  styleUrls: ['./quote-request-generator.component.scss']
})
export class QuoteRequestGeneratorComponent implements OnInit {
  quoteRequestForm: FormGroup;
  quoteRequest: QuoteRequest = new QuoteRequest();
  draftQuoteRequest: QuoteRequest;
  buyer: User;
  isValid: Boolean;

  constructor(
    private stepperService: StepperService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private quoteRequestDataService: QuoteRequestDataService
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.buyer = this.getSmallBuyer(this.route.snapshot.data['buyer']);
    this.draftQuoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quoteRequestForm = this.formBuilder.group({
      _id: this.draftQuoteRequest ? this.draftQuoteRequest._id : undefined,
      numericId: this.draftQuoteRequest ? this.draftQuoteRequest.numericId : undefined,
      buyer: this.formBuilder.group({
        _id: this.buyer ? this.buyer._id : undefined,
        numericId: this.buyer ? this.buyer.numericId : undefined,
        first_name: [this.buyer ? this.buyer.first_name : undefined, Validators.required],
        last_name: [this.buyer ? this.buyer.last_name : undefined, Validators.required],
        email: [this.buyer ? this.buyer.email : undefined, [Validators.required, Validators.email]],
        company_name: [this.buyer ? this.buyer.company_name : undefined, Validators.required],
        address: [this.buyer ? this.buyer.address : undefined, Validators.required],
        city: [this.buyer ? this.buyer.city : undefined, Validators.required],
        zipcode: [this.buyer ? this.buyer.zipcode : undefined, Validators.required],
        country: [this.buyer ? this.buyer.country : undefined, Validators.required],
        phone_number: [this.buyer ? this.buyer.phone_number : undefined, Validators.required],
        contact_by: [this.formBuilder.array(this.buyer.contact_by || [], Validators.required)]
      }),
      document_weight_unit: [this.draftQuoteRequest ? this.draftQuoteRequest.document_weight_unit : undefined],
      currency: [this.draftQuoteRequest ? this.draftQuoteRequest.currency : undefined, Validators.required],
      buyer_comments: [this.draftQuoteRequest ? this.draftQuoteRequest.buyer_comments : undefined],
      valid_by: [this.draftQuoteRequest ? this.draftQuoteRequest.valid_by : undefined, Validators.required],
      date_created: [moment(Date.now()).toJSON(), Validators.required]
    });
    this.quoteRequest = this.quoteRequestForm.value;
    this.quoteRequest.buyer.contact_by = this.quoteRequestForm.value.buyer.contact_by.value;
    if (this.draftQuoteRequest) {
      this.quoteRequest.sellers = this.draftQuoteRequest.sellers;
      this.quoteRequest.products = this.draftQuoteRequest.products;
    }
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
    this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
      this.quoteRequest = quoteRequest;
    });
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
      country: seller.company_information.country,
      zipcode: seller.company_information.zipcode,
      phone_number: seller.personal_information.phone_number,
      contact_by: seller.contact_by
    };
  }

  confirm() {
    if (this.isValid) {
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
    this.location.back();
  }

  validQuoteRequest(receivedValue: Boolean) {
    this.isValid = receivedValue;
  }
}
