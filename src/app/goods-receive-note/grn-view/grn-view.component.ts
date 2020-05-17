import { Component, OnInit } from '@angular/core';
import { GoodsReceivedNote, PaymentStatus, UpdateGoodsReceivedNoteDTO, Utils } from '@avenews/agt-sdk';
import { ActivatedRoute } from '@angular/router';
import { SdkService } from '@app/core/sdk.service';
import Swal from 'sweetalert2';
import { SpinnerToggleService } from '@app/shared/services/spinner-toggle.service';
declare const $: any;

@Component({
  selector: 'app-grn-view',
  templateUrl: './grn-view.component.html',
  styleUrls: ['./grn-view.component.scss']
})
export class GrnViewComponent implements OnInit {
  grn: GoodsReceivedNote;
  grnPaymentStatus: PaymentStatus;

  constructor(
    private route: ActivatedRoute,
    private sdkService: SdkService,
    private spinnerToggleService: SpinnerToggleService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ grn }) => {
      this.grn = grn;
      this.grnPaymentStatus = grn.paymentStatus;
    });
  }

  async updatePaymentStatus() {
    this.spinnerToggleService.showSpinner();
    const dto: UpdateGoodsReceivedNoteDTO = {
      paymentStatus: this.grnPaymentStatus
    };

    await this.sdkService.updateGrnPaymentStatus(this.grn._id, dto).then(data => {
      this.spinnerToggleService.hideSpinner();
      this.onModalClose();
      Swal.fire({
        icon: 'success',
        title: 'The payment status has been changed to ' + Utils.getPaymentStatus(data.paymentStatus) + '!'
      });
      this.grn = data;
    });
  }

  downloadPdf() {
    if (this.grn.pdf && this.grn.pdf.url) {
      window.open(this.grn.pdf.url);
    } else {
      this.sdkService.getGoodsReceivedNotePdfLinkById(this.grn._id).then(link => {
        window.open(link);
      });
    }
  }

  onModalClose() {
    $('#updatePaymentStatusModal').fadeOut('fast');
  }
}
