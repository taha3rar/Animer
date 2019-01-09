import { AuthenticationService } from './../../core/authentication/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';
import { ProformaInvoice } from '@app/core/models/transaction/pi';

declare const $: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  sideDivVisible = false;
  purchaseOrder = false;
  proformaInvoiceGenrated = true;
  transaction: Transaction = new Transaction();
  isSeller = false;

  constructor(private location: Location, private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {
    const currentUserId = this.authService.currentUserId;
    this.transaction = this.route.snapshot.data['transaction'];
    if (currentUserId === this.transaction.seller_id) {
      this.isSeller = true;
    }
    console.log(this.transaction);
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
