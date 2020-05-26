import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from '../loan-generator-data.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  @Output() actionOnPreview = new EventEmitter<boolean>();
  constructor(
    stepperNavigationService: StepperNavigationService,
    sdkService: SdkService,
    loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(4, stepperNavigationService, sdkService, loanGeneratorDataService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  toPreview() {
    super.onSave();
    this.actionOnPreview.emit(true);
  }
}
