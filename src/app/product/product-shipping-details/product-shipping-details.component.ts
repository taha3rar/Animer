import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { countries } from '@app/shared/helpers/countries';

@Component({
  selector: 'app-product-shipping-details',
  templateUrl: './product-shipping-details.component.html',
  styleUrls: ['./product-shipping-details.component.scss']
})
export class ProductShippingDetailsComponent implements OnInit {
  countriesList: any;
  public searchControl: FormControl;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.countriesList = countries;
    this.searchControl = new FormControl();
  }
}
