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

@Component({
  selector: 'app-quote-request-generator',
  templateUrl: './quote-request-generator.component.html',
  styleUrls: ['./quote-request-generator.component.scss']
})
export class QuoteRequestGeneratorComponent implements OnInit {
  quoteRequestForm: FormGroup;
  draftQuoteRequest: QuoteRequest;
  buyer: User;
  targeted_sellers: any[];

  constructor(
    private stepperService: StepperService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    this.buyer = this.getSmallBuyer(this.route.snapshot.data['buyer']);
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
      currency: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.currency,
        Validators.required
      ],
      buyer_comments: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.buyer_comments,
        Validators.required
      ],
      valid_buy: [
        Object.is(this.draftQuoteRequest, undefined) ? undefined : this.draftQuoteRequest.valid_by,
        Validators.required
      ],
      date_created: [Date.now(), Validators.required]
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
    if (!this.quoteRequestForm.dirty || this.quoteRequestForm || this.draftQuoteRequest) {
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

  receiveSellersList($event: any[]) {
    this.targeted_sellers = $event;
  }

  back() {
    this.location.back();
  }
}
