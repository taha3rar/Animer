import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Component({
  selector: 'app-quote-request-generator',
  templateUrl: './quote-request-generator.component.html',
  styleUrls: ['./quote-request-generator.component.scss']
})
export class QuoteRequestGeneratorComponent implements OnInit {
  quoteRequestForm: FormGroup;
  draftQuoteRequest: QuoteRequest;

  constructor(private stepperService: StepperService, private location: Location, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.stepperService.stepperInit();
  }

  back() {
    this.location.back();
  }
}
