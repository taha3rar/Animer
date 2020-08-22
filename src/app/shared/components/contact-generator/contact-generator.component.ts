import { countries } from './../../helpers/countries';
import { StepperService } from './../../../core/stepper.service';
import { SdkService } from './../../../core/sdk.service';
import { Component, OnInit, Input } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-contact-generator',
  templateUrl: './contact-generator.component.html',
  styleUrls: ['./contact-generator.component.scss'],
})
export class ContactGeneratorComponent implements OnInit {
  title = 'Farmer Details';
  step = 1;
  countries = countries;
  @Input() isEdit: boolean;
  @Input() contact: any;
  constructor(private stepperService: StepperService) {}
  ngOnInit() {
    this.stepperService.stepperInit();
  }
  onModalClose() {
    $('#addContactWizard').fadeOut();
  }
}
