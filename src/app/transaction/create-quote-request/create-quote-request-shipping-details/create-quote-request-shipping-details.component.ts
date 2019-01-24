import { Component, OnInit, Input } from '@angular/core';
import { incotermsGroups } from '@app/shared/helpers/incoterms';
import { countries } from '@app/shared/helpers/countries';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import * as moment from 'moment';

@Component({
  selector: 'app-create-quote-request-shipping-details',
  templateUrl: './create-quote-request-shipping-details.component.html',
  styleUrls: ['./create-quote-request-shipping-details.component.scss']
})
export class CreateQuoteRequestShippingDetailsComponent implements OnInit {
  @Input()
  quoteRequest: QuoteRequest;
  incotermsGroups = incotermsGroups;
  countriesList = countries;
  shippingDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.shippingDetailsForm = this.formBuilder.group({
      local_quote_request: [false, Validators.required],
      international_quote_request: [true, Validators.required],
      incoterms: ['', Validators.required],
      excluded_countries: [this.formBuilder.array([Validators.required])],
      address: ['', Validators.required],
      gps_coordinates: [''],
      expected_delivery_date: ['', Validators.required]
    });

    this.shippingDetailsForm.get('local_quote_request').valueChanges.subscribe(localQuoteRequest => {
      if (localQuoteRequest) {
        this.shippingDetailsForm.get('international_quote_request').setValue(false);
      } else {
        this.shippingDetailsForm.get('international_quote_request').setValue(true);
      }
    });

    this.shippingDetailsForm.get('international_quote_request').valueChanges.subscribe(internationalQuoteRequest => {
      if (internationalQuoteRequest) {
        this.shippingDetailsForm.get('local_quote_request').setValue(false, { emitEvent: false });
        this.shippingDetailsForm.get('incoterms').enable();
        this.shippingDetailsForm.get('excluded_countries').enable();
      } else {
        this.shippingDetailsForm.get('local_quote_request').setValue(true, { emitEvent: false });
        this.shippingDetailsForm.get('incoterms').disable();
        this.shippingDetailsForm.get('incoterms').setValue('');
        this.shippingDetailsForm.get('excluded_countries').disable();
        this.shippingDetailsForm.get('excluded_countries').setValue([]);
      }
    });
  }

  get shippingDetailsf() {
    return this.shippingDetailsForm.controls;
  }

  next() {
    this.quoteRequest.excluded_coutries = this.shippingDetailsf.excluded_countries.value;
    this.quoteRequest.incoterms = this.shippingDetailsf.incoterms.value;
    this.quoteRequest.international = this.shippingDetailsf.international_quote_request.value;
    this.quoteRequest.local = this.shippingDetailsf.local_quote_request.value;
    this.quoteRequest.gps_coordinates = this.shippingDetailsf.gps_coordinates.value;
    this.quoteRequest.receive_date = moment(this.shippingDetailsf.expected_delivery_date.value).toJSON();
    this.quoteRequest.point_of_delivery = this.shippingDetailsf.address.value;
  }
}