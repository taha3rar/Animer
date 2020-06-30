import { ActivatedRoute } from '@angular/router';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsReceivedNote, DPOWallet, RequestDPOPaymentDTO } from '@avenews/agt-sdk';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-document-payment-details',
  templateUrl: './document-payment-details.component.html',
  styleUrls: ['./document-payment-details.component.scss'],
})
export class DocumentPaymentDetailsComponent extends BaseValidationComponent implements OnInit {
  @Input() grn: GoodsReceivedNote;
  @Output() paymentOutput = new EventEmitter<RequestDPOPaymentDTO>();
  signForm: FormGroup;
  wallet: DPOWallet;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.wallet = data['wallet'];
    });
    this.signForm = this.fb.group({
      fullName: [undefined, Validators.required],
      businessName: [undefined, Validators.required],
      phoneNumber: [undefined, Validators.required],
    });
    this.formInput = this.signForm;
  }
  isValid() {
    this.onSubmit(this.signForm);
    if (this.signForm.valid) {
      const payment: RequestDPOPaymentDTO = {
        amount: this.grn.total,
        goodsReceivedNote: this.grn,
        signedBy: this.signForm.value,
      };
      this.paymentOutput.emit(payment);
      $('#next-1').trigger('click');
    }
  }
}
