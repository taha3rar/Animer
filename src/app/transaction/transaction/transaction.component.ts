import { AuthenticationService } from './../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@app/core/models/transaction';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';

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

  constructor(private location: Location, private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {
    this.handleStepper();

    const currentUserId = this.authService.currentUserId;
    this.route.data.subscribe(({ transaction, quoteRequest }) => {
      this.transaction = transaction;
      this.quoteRequest = quoteRequest;

      if (currentUserId === this.transaction.seller_id) {
        this.isSeller = true;
      }
    });
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

  handleStepper() {
    $(function() {
      const $progressStepper = $('.stepper');
      let $tab_active: any;
      let $tab_next: any;
      const $btn_next = $progressStepper.find('.next-step');
      const $tab_toggle = $progressStepper.find('[data-toggle="tab"]');
      console.log($btn_next);
      $tab_toggle.on('show.bs.tab', function(e: any) {
        const $target = $(e.target);

        if (!$target.parent().hasClass('active, disabled')) {
          $target.parent().removeClass('active');
        }
        if ($target.parent().hasClass('disabled')) {
          return false;
        }
      });

      $btn_next.on('click', function() {
        $tab_active = $progressStepper.find('.active');
        $tab_active.next().addClass('completed');
        $tab_active.addClass('completed');

        $tab_active.next().removeClass('disabled');

        $tab_next = $tab_active.next().children('a[data-toggle="tab"]');
        $($tab_next).trigger('click');
      });
    });
  }
}
