import { SdkService } from './../../core/sdk.service';
import {
  CreateGoodsReceivedNoteDTO,
  GoodsReceivedNoteProduct,
  GoodsReceivedNote
} from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { AlertsService } from '@app/core/alerts.service';
import { SpinnerToggleService } from '@app/shared/services/spinner-toggle.service';
import { Router } from '@angular/router';
import { Utils, Contact, AGTError } from '@avenews/agt-sdk';

@Component({
  selector: 'app-grn-document',
  templateUrl: './grn-document.component.html',
  styleUrls: ['./grn-document.component.scss']
})
export class GrnDocumentComponent {
  @Input() grn: any; // CreateGoodsReceivedNoteDTO | GoodsReceivedNote;
  @Input() products: any[] = [];
  @Output() formSubmitted = new EventEmitter<boolean>();

  constructor(
    private alerts: AlertsService,
    private sdkService: SdkService,
    private router: Router,
    private spinnerService: SpinnerToggleService
  ) {}

  submitGrn() {
    this.spinnerService.showSpinner();
    const grn: CreateGoodsReceivedNoteDTO = {
      currency: this.grn.currency,
      issueDate: this.grn.issueDate,
      notes: this.grn.notes,
      paymentStatus: this.grn.paymentStatus,
      referenceCode: this.grn.referenceCode,
      products: this.grn.products,
      supplier: this.grn.supplier as Contact,
      receivedBy: this.grn.receivedBy,
      total: this.grn.total
    };
    this.sdkService
      .createGoodsReceivedNote(grn)
      .then(data => {
        if (data._id) {
          this.formSubmitted.emit(true);
          this.spinnerService.hideSpinner();
          this.alerts.showAlert('New Goods Received Note has been created!');
          this.router.navigate(['grn']);
        }
      })
      .catch((err: AGTError) => {
        this.alerts.showAlertDanger(err.message);
      });
  }
}
