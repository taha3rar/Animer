import { Component, OnInit } from '@angular/core';
import { StepperService } from '@app/core/stepper.service';
declare const $: any;
@Component({
  selector: 'app-ecosystem-generator',
  templateUrl: './ecosystem-generator.component.html',
  styleUrls: ['./ecosystem-generator.component.scss'],
})
export class EcosystemGeneratorComponent implements OnInit {
  title = 'Organisation Details';
  step = 1;
  constructor(private stepperService: StepperService) {}
  ngOnInit() {
    this.stepperService.stepperInit();
  }
  onModalClose() {
    $('#addEcosystemWizard').fadeOut();
  }
  changeStepTitle(object: { title: string; step: number }) {
    this.title = object.title;
    this.step = object.step;
  }
}
