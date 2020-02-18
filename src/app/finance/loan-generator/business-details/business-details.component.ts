import { StepperNavigationService } from './../stepper-navigation.service';
import { StepperService } from '@app/core/forms/stepper.service';
import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {
  @ViewChild('businessStepper') businessStepper: ElementRef;
  constructor(private stepperService: StepperNavigationService) {}

  ngOnInit() {}

  goNext() {
    this.stepperService.innerStepsList = this.businessStepper.nativeElement.children;
    this.stepperService.onNext();
  }

  goBack() {
    this.stepperService.innerStepsList = this.businessStepper.nativeElement.children;
    this.stepperService.onPrevious();
  }
}
