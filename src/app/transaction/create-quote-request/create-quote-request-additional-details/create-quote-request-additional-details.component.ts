import { BaseValidationComponent } from './../../../shared/components/base-validation/base-validation.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import { Client } from '@app/core/models/user/client';
import { Ecosystem } from '@app/core/models/ecosystem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuoteRequestRecipients } from '@app/core/models/transaction/quote-request/quote-request-recipients';
import * as moment from 'moment';

declare const $: any;
@Component({
  selector: 'app-create-quote-request-additional-details',
  templateUrl: './create-quote-request-additional-details.component.html',
  styleUrls: ['./create-quote-request-additional-details.component.scss']
})
export class CreateQuoteRequestAdditionalDetailsComponent extends BaseValidationComponent implements OnInit {
  @Input()
  quoteRequest: QuoteRequest;
  @Input()
  suppliers: Client[];
  @Input()
  ecosystems: Ecosystem[];
  @Output()
  submitQuoteRequestEvent = new EventEmitter<QuoteRequestRecipients>();
  additionalDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.multiSelectHandler();

    this.additionalDetailsForm = this.formBuilder.group({
      send_suppliers: [true, Validators.required],
      send_ecosystems: [true, Validators.required],
      send_avenews: [true, Validators.required],
      suppliers: [this.formBuilder.array([Validators.required])],
      ecosystems: [this.formBuilder.array([Validators.required])],
      valid_until: ['', Validators.required],
      remarks: ['']
    });

    this.additionalDetailsForm.get('send_suppliers').valueChanges.subscribe(sendSuppliers => {
      if (sendSuppliers) {
        this.additionalDetailsForm.get('suppliers').enable();
      } else {
        this.additionalDetailsForm.get('suppliers').disable();
        this.additionalDetailsForm.get('suppliers').setValue([]);
      }
    });

    this.additionalDetailsForm.get('send_ecosystems').valueChanges.subscribe(sendEcosystems => {
      if (sendEcosystems) {
        this.additionalDetailsForm.get('ecosystems').enable();
      } else {
        this.additionalDetailsForm.get('ecosystems').disable();
        this.additionalDetailsForm.get('ecosystems').setValue([]);
      }
    });

    this.formInput = this.additionalDetailsForm;
  }

  get additionalDetailsf() {
    return this.additionalDetailsForm.controls;
  }

  submit() {
    this.quoteRequest.valid_until = moment(this.additionalDetailsf.valid_until.value).toJSON();
    this.quoteRequest.remarks = this.additionalDetailsf.remarks.value;

    const recipients = new QuoteRequestRecipients();
    recipients.suppliers = this.additionalDetailsf.suppliers.value;
    recipients.ecosystems = this.additionalDetailsf.ecosystems.value;
    recipients.avenews = this.additionalDetailsf.send_avenews.value;

    this.submitQuoteRequestEvent.emit(recipients);
  }

  multiSelectHandler() {
    $(document).ready(function() {
      $('.selectpicker').selectpicker();
    });
  }
}
