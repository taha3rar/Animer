import { Component, OnInit } from '@angular/core';
import { countries } from '@app/shared/helpers/countries';

@Component({
  selector: 'app-business-key-contact',
  templateUrl: './business-key-contact.component.html',
  styleUrls: ['./business-key-contact.component.scss']
})
export class BusinessKeyContactComponent implements OnInit {
  countries = countries;

  constructor() {}

  ngOnInit() {}
}
