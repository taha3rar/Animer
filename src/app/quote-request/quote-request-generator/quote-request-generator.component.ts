import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';

@Component({
  selector: 'app-quote-request-generator',
  templateUrl: './quote-request-generator.component.html',
  styleUrls: ['./quote-request-generator.component.scss']
})
export class QuoteRequestGeneratorComponent implements OnInit {
  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.stepperService.stepperInit();
  }
}
