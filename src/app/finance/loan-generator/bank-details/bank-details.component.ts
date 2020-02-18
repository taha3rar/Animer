import { StepperNavigationService } from './../stepper-navigation.service';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  @ViewChild('bankStepper') bankStepper: ElementRef;

  constructor(private stepperService: StepperNavigationService) {}

  ngOnInit() {}

  goNext() {
    this.stepperService.innerStepsList = this.bankStepper.nativeElement.children;
    this.stepperService.onNext();
  }

  goBack() {
    this.stepperService.innerStepsList = this.bankStepper.nativeElement.children;
    this.stepperService.onPrevious();
  }
}
