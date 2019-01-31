import { Component, OnInit, Input, NgZone } from '@angular/core';
import { incotermsGroups } from '@app/shared/helpers/incoterms';
import { countries } from '@app/shared/helpers/countries';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import * as moment from 'moment';

declare const $: any;
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
  gpsCoordinates: string;
  public addrKeys: string[];
  public addr: object;

  constructor(private formBuilder: FormBuilder, private zone: NgZone) {}

  ngOnInit() {
    this.shippingDetailsForm = this.formBuilder.group({
      local_quote_request: [false, Validators.required],
      international_quote_request: [true, Validators.required],
      incoterms: ['', Validators.required],
      excluded_countries: [this.formBuilder.array([Validators.required])],
      address: ['', Validators.required],
      gps_coordinate_lng: [''],
      gps_coordinate_lat: [''],
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

    this.multiSelectHandler();
  }

  get shippingDetailsf() {
    return this.shippingDetailsForm.controls;
  }

  setAddress(addrObj: any) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      if (this.addr['lat'] && this.addr['lng']) {
        this.shippingDetailsForm.patchValue({
          address: this.addr['formatted_address'],
          gps_coordinate_lng: this.addr['lng'],
          gps_coordinate_lat: this.addr['lat']
        });
        this.gpsCoordinates = '[' + this.addr['lat'] + '] [' + this.addr['lng'] + ']';
      }
    });
  }

  next() {
    this.quoteRequest.excluded_coutries = this.shippingDetailsForm.value.excluded_countries.value;
    this.quoteRequest.incoterms = this.shippingDetailsf.incoterms.value;
    this.quoteRequest.international = this.shippingDetailsf.international_quote_request.value;
    this.quoteRequest.local = this.shippingDetailsf.local_quote_request.value;
    this.quoteRequest.gps_coordinates = [];
    this.quoteRequest.gps_coordinates.push(this.shippingDetailsf.gps_coordinate_lng.value);
    this.quoteRequest.gps_coordinates.push(this.shippingDetailsf.gps_coordinate_lat.value);
    this.quoteRequest.receive_date = moment(this.shippingDetailsf.expected_delivery_date.value).toJSON();
    this.quoteRequest.point_of_delivery = this.shippingDetailsf.address.value;
  }

  multiSelectHandler() {
    $(document).ready(function() {
      $('.selectpicker').selectpicker();
    });
  }
}
