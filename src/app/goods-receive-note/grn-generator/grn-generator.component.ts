import { ActivatedRoute } from '@angular/router';
import { CreateGoodsReceivedNoteDTO } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Component, OnInit } from '@angular/core';
import { Contact } from '@avenews/agt-sdk';

@Component({
  selector: 'app-grn-generator',
  templateUrl: './grn-generator.component.html',
  styleUrls: ['./grn-generator.component.scss']
})
export class GrnGeneratorComponent implements OnInit {
  grn: CreateGoodsReceivedNoteDTO = {
    currency: undefined,
    issueDate: undefined,
    notes: undefined,
    paymentStatus: undefined,
    products: [],
    receivedBy: {
      businessName: undefined,
      name: undefined,
      phoneNumber: undefined
    },
    referenceCode: undefined,
    supplier: undefined,
    total: undefined
  };

  constructor() {}

  ngOnInit() {}
}
