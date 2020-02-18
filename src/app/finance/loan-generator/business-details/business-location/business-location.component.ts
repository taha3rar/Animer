import { countries } from '@app/shared/helpers/countries';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-location',
  templateUrl: './business-location.component.html',
  styleUrls: ['./business-location.component.scss']
})
export class BusinessLocationComponent implements OnInit {
  countries = countries;

  constructor() {}

  ngOnInit() {}
}
