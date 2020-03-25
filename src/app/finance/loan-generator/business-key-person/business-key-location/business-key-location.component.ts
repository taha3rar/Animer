import { Component, OnInit } from '@angular/core';
import { countries } from '@app/shared/helpers/countries';

@Component({
  selector: 'app-business-key-location',
  templateUrl: './business-key-location.component.html',
  styleUrls: ['./business-key-location.component.scss']
})
export class BusinessKeyLocationComponent implements OnInit {
  countries = countries;

  constructor() {}

  ngOnInit() {}
}
