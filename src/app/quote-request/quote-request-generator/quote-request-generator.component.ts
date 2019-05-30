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
      _id: Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest._id,
      numericId: Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.numericId,
      buyer: this.formBuilder.group({
        _id: Object.is(this.buyer, undefined) ? undefined : this.buyer._id,
        numericId: [this.buyer.numericId || undefined],
        first_name: [this.buyer.first_name || undefined, Validators.required],
        last_name: [this.buyer.last_name || undefined, Validators.required],
        email: [this.buyer.email || undefined, [Validators.required, Validators.email]],
        company_name: [this.buyer.company_name || undefined, Validators.required],
        address: [this.buyer.address || undefined, Validators.required],
        city: [this.buyer.city || undefined, Validators.required],
        zipcode: [this.buyer.zipcode || undefined, Validators.required],
        country: [this.buyer.country || undefined, Validators.required],
        phone_number: [this.buyer.phone_number || undefined, Validators.required],
        contact_by: [this.formBuilder.array(this.buyer.contact_by || [], Validators.required)]
      }),
      document_weight_unit: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.document_weight_unit
      ],
      currency: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.currency,
        Validators.required
      ],
      buyer_comments: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.buyer_comments
      ],
      valid_by: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.valid_by,
        Validators.required
      ],
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
