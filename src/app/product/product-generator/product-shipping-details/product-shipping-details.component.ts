import { Component, OnInit, NgZone, Input } from '@angular/core';
import { countries } from '@app/shared/helpers/countries';
import { BaseProduct } from '../base-product';
import { ProductDataService } from '../product-data.service';
import { Validators } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-product-shipping-details',
  templateUrl: './product-shipping-details.component.html',
  styleUrls: ['./product-shipping-details.component.scss']
})
export class ProductShippingDetailsComponent extends BaseProduct implements OnInit {
  public addrKeys: string[];
  public addr: object;
  countriesList: any;
  @Input()
  edit: boolean;

  constructor(protected productDataService: ProductDataService, private zone: NgZone) {
    super(productDataService);
  }

  ngOnInit() {
    this.multiSelectHandler();
    super.ngOnInit();
    this.countriesList = countries;
    if (!this.form.controls.international_buyers.value) {
      this.form.get('tariff_code').disable();
      this.form.get('tariff_code').setValue('');
      this.form.get('excluded_countries').disable();
      this.form.get('excluded_countries').setValue('');
    }

    this.form.get('international_buyers').valueChanges.subscribe(international => {
      if (international) {
        this.form.get('tariff_code').enable();
        this.form.get('tariff_code').setValidators([Validators.required]);
        this.form.get('excluded_countries').enable();
        this.form.get('excluded_countries').setValidators([Validators.required]);
      } else {
        this.form.get('tariff_code').disable();
        this.form.get('tariff_code').setValue('');
        this.form.get('excluded_countries').disable();
        this.form.get('excluded_countries').setValue('');
      }
    });
    this.onChanges();
  }

  onChanges() {
    this.form.get('quantity').valueChanges.subscribe(val => {
      if (!this.isProcessed) {
        this.setTotalWeight();
      } else {
        this.setTotalItems();
      }
    });
    this.form.get('package_weight').valueChanges.subscribe(val => {
      this.setTotalWeight();
    });
    this.form.get('items_per_package').valueChanges.subscribe(val => {
      this.setTotalItems();
    });
  }

  setTotalWeight() {
    if (this.form.controls.quantity.value && this.form.controls.package_weight.value) {
      this.form.patchValue({
        total_weight: (this.form.controls.quantity.value * this.form.controls.package_weight.value).toFixed(2)
      });
    } else {
      this.form.patchValue({ total_weight: 0 });
    }
  }

  setTotalItems() {
    if (this.form.controls.quantity.value && this.form.controls.items_per_package.value) {
      this.form.patchValue({
        total_amount_items: (this.form.controls.quantity.value * this.form.controls.items_per_package.value).toFixed(2)
      });
    } else {
      this.form.patchValue({ total_amount_items: 0 });
    }
  }

  get validShipping() {
    const valid =
      this.form.controls.loading_location.valid &&
      this.form.controls.gps_coordinates.valid &&
      (this.form.controls.tariff_code.valid || this.form.controls.tariff_code.disabled) &&
      (this.form.controls.excluded_countries.valid || this.form.controls.tariff_code.disabled) &&
      this.form.controls.international_buyers.valid;

    return valid;
  }

  setAddress(addrObj: any) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      if (this.addr['lat'] && this.addr['lng']) {
        this.form.patchValue({
          loading_location: this.addr['formatted_address'],
          gps_coordinates: '[' + this.addr['lat'] + '] [' + this.addr['lng'] + ']'
        });
      }
    });
  }

  multiSelectHandler() {
    $(document).ready(function() {
      $('.selectpicker').selectpicker();
    });
  }
}
