import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/forms/stepper.service';

@Component({
  selector: 'app-quotation-generator',
  templateUrl: './quotation-generator.component.html',
  styleUrls: ['./quotation-generator.component.scss']
})
export class QuotationGeneratorComponent implements OnInit {
  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.stepperService.stepperInit();
  }
}
