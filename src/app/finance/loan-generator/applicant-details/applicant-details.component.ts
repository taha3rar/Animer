import { StepperNavigationService } from './../stepper-navigation.service';
import { StepperService } from '@app/core/forms/stepper.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {
  @ViewChild('applicantStepper') applicantStepper: ElementRef;
  @Input() stepper: ElementRef;
  currentStep = 1;

  constructor(private stepperService: StepperNavigationService) {}

  ngOnInit() {}

  goNext() {
    this.stepperService.innerStepsList = this.applicantStepper.nativeElement.children;
    this.stepperService.onNext();
  }

  goBack() {
    this.stepperService.innerStepsList = this.applicantStepper.nativeElement.children;
    this.stepperService.onPrevious();
  }
}
