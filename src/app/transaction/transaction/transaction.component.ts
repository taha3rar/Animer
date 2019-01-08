import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  sideDivVisible = false;
  purchaseOrder = false;
  proformaInvoice = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute) {}

  ngOnInit() {
    if(this.route.snapshot.data['proformaInvoice']) {
      this.proformaInvoice = true;
    }

    if(this.route.snapshot.data['purchaseOrder']) {
      this.purchaseOrder = true;
    }
  }

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

  back() {
    this.location.back();
  }
}
