import { StepperService } from './../../core/stepper.service';
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

  constructor(
    private quoteRequestService: QuoteRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private stepperService: StepperService
  ) {
    this.route.data.subscribe(({ suppliers, ecosystems }) => {
      this.suppliers = suppliers;
      this.ecosystems = ecosystems;
    });
  }

  ngOnInit() {
    this.stepperService.stepperInit();
    this.quoteRequest = new QuoteRequest();
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
}
