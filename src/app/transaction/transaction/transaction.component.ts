import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  sideDivVisible = false;

  constructor() {}

  ngOnInit() {}

  adjustDiv() {
    if (this.sideDivVisible === false) {
      $('.stepper').css('width', '80%');
      $('.docs-tab').css('width', '15%');
      this.sideDivVisible = true;
    } else {
      $('.stepper').css('width', '95%');
      $('.docs-tab').css('width', '0px');
      this.sideDivVisible = false;
    }
  }
}
