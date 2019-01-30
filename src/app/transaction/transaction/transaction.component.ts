import { AuthenticationService } from './../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import { StepperService } from '@app/core/stepper.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  sideDivVisible = false;
  isSeller = false;
  transaction: Transaction = new Transaction();
  quoteRequest: QuoteRequest;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    const currentUserId = this.authService.currentUserId;
    this.route.data.subscribe(({ transaction, quoteRequest }) => {
      this.transaction = transaction;
      this.quoteRequest = quoteRequest;

      if (currentUserId === this.transaction.seller_id) {
        this.isSeller = true;
      }
    });
    this.stepperService.stepperInit();
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
