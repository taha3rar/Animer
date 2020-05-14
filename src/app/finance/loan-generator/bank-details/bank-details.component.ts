import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  @Output() actionOnPreview = new EventEmitter<boolean>();
  constructor(stepperNavigationService: StepperNavigationService) {
    super(4, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  toPreview() {
    this.actionOnPreview.emit(true);
  }
}
