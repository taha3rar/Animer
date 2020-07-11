import { CreateGoodsReceivedNoteDTO, GoodsReceivedNoteProduct } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { AlertsService } from '@app/core/alerts.service';
import { SpinnerToggleService } from '@app/shared/services/spinner-toggle.service';
import { Router } from '@angular/router';
import { Utils, Contact, AGTError, GoodsReceivedNote } from '@avenews/agt-sdk';
import { SdkService } from '@app/core/sdk.service';
declare const $: any;
@Component({
  selector: 'app-grn-modal',
  templateUrl: './grn-modal.component.html',
  styleUrls: ['./grn-modal.component.scss'],
})
export class GrnModalComponent {
  @Input() grn: GoodsReceivedNote;
  @Output() select = new EventEmitter<boolean>();

  constructor() {}
  selectDocument() {
    this.select.emit(true);
    this.onModalClose();
  }
  onModalClose() {
    $('#grnViewModal').fadeOut('fast');
  }
}
