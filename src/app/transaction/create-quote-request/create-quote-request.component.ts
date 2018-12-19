import { Component, OnInit } from '@angular/core';
import { incotermsGroups } from '@app/shared/_helpers/incoterms';
import { countries } from '@app/shared/_helpers/_countries';
import { packageUnits, containerType } from '@app/shared/_helpers/packaging_details';

declare const $: any;

@Component({
  selector: 'app-create-quote-request',
  templateUrl: './create-quote-request.component.html',
  styleUrls: ['./create-quote-request.component.scss']
})
export class CreateQuoteRequestComponent implements OnInit {
  incotermsGroups = incotermsGroups;
  countriesList = countries;
  units = packageUnits;
  containerType = containerType;
  constructor() {}

  ngOnInit() {}

  checkContainerToggle() {
    if ($('#container_switch').is(':checked')) {
      return false;
    } else {
      return true;
    }
  }

  checkPackageToggle() {
    if ($('#packing_switch').is(':checked')) {
      return false;
    } else {
      return true;
    }
  }
}
