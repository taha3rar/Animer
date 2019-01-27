import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client } from '@app/core/models/user/client';
import { Ecosystem } from '@app/core/models/ecosystem';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteRequestService } from '@app/core/api/quote-request.service';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import { QuoteRequestRecipients } from '@app/core/models/transaction/quote-request/quote-request-recipients';

@Component({
  selector: 'app-create-quote-request',
  templateUrl: './create-quote-request.component.html',
  styleUrls: ['./create-quote-request.component.scss']
})
export class CreateQuoteRequestComponent implements OnInit {
  suppliers: Client[];
  ecosystems: Ecosystem[];
  quoteRequest: QuoteRequest;
  @ViewChild('closeModal')
  closeModal: ElementRef;

  constructor(private quoteRequestService: QuoteRequestService, private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe(({ suppliers, ecosystems }) => {
      this.suppliers = suppliers;
      this.ecosystems = ecosystems;
    });
  }

  ngOnInit() {
    this.quoteRequest = new QuoteRequest();
    this.handleStepper();
  }

  submit($event: QuoteRequestRecipients) {
    const recipients = $event;

    if (this.quoteRequest.international) {
      this.quoteRequest.transaction_type = 'international';
    } else {
      this.quoteRequest.transaction_type = 'local';
    }

    this.quoteRequestService.sendToRecipients(this.quoteRequest, recipients);

    this.router.navigate([this.router.url]);
    this.closeModal.nativeElement.click();
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
