import { Component, OnInit } from '@angular/core';
import { GoodsReceivedNote, PaymentStatus, UpdateGoodsReceivedNoteDTO } from '@avenews/agt-sdk';
import { ActivatedRoute } from '@angular/router';
import { SdkService } from '@app/core/sdk.service';

@Component({
  selector: 'app-grn-view',
  templateUrl: './grn-view.component.html',
  styleUrls: ['./grn-view.component.scss']
})
export class GrnViewComponent implements OnInit {
  grn: GoodsReceivedNote;
  grnPaymentStatus: PaymentStatus;

  constructor(private route: ActivatedRoute, private sdkService: SdkService) {}

  ngOnInit() {
    this.route.data.subscribe(({ grn }) => {
      this.grn = grn;
      this.grnPaymentStatus = grn.paymentStatus;
    });
  }

  async updatePaymentStatus() {
    // TODO: Add loader
    const dto: UpdateGoodsReceivedNoteDTO = {
      paymentStatus: this.grnPaymentStatus
    };

    const grn = await this.sdkService.updateGrnPaymentStatus(this.grn._id, dto);
    this.grn = grn;
  }

  downloadPdf() {
    // TODO: Add loader
    if (this.grn.pdf && this.grn.pdf.copy) {
      window.open(this.grn.pdf.copy);
    } else {
      this.sdkService.getGoodsReceivedNotePdfLinkById(this.grn._id).then(link => {
        window.open(link);
      });
    }
  }
}
