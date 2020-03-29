import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';

@Component({
  selector: 'app-loan-goals',
  templateUrl: './loan-goals.component.html',
  styleUrls: ['./loan-goals.component.scss']
})
export class LoanGoalsComponent implements OnInit {
  loan_form: FormGroup;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
