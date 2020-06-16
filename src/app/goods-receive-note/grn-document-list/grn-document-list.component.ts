import { Component, OnInit, Input } from '@angular/core';
import { GoodsReceivedNote } from '@avenews/agt-sdk';

declare const $: any;

@Component({
  selector: 'app-grn-document-list',
  templateUrl: './grn-document-list.component.html'
})
export class GrnDocumentListComponent implements OnInit {
  @Input()
  grn: GoodsReceivedNote;

  constructor() {}

  ngOnInit() {}
}
