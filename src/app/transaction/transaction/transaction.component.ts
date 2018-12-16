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

  adjustDiv(type: string) {
    if (this.sideDivVisible === false) {
      $('.stepper').css('width', '80.5%');
      setTimeout(function() {
        $('.side-tab').css('width', '13.5%');
      }, 100);
      if (type === 'docs') {
        $('.chat-content').hide();
        $('.docs-content').show();
      } else {
        $('.docs-content').hide();
        $('.chat-content').show();
      }
      this.sideDivVisible = true;
    } else {
      $('.stepper').css('width', '96%');
      $('.side-tab').css('width', '0px');
      this.sideDivVisible = false;
    }
  }
}
