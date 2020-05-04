import { Component, OnInit } from '@angular/core';
declare var $: any;
import { StepperService } from '@app/core/stepper.service';

@Component({
  selector: 'app-grn-first-step',
  templateUrl: './grn-first-step.component.html',
  styleUrls: ['./grn-first-step.component.scss']
})
export class GrnFirstStepComponent implements OnInit {
  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.stepperService.stepperInit();
    setTimeout(function() {
      $('.selectpicker').selectpicker();
    }, 200);
  }
}
