import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { User, Contact } from '@avenews/agt-sdk';
import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';
@Component({
  selector: 'app-contact-transactions',
  templateUrl: './contact-transactions.component.html',
  styleUrls: ['./contact-transactions.component.scss']
})
export class ContactTransactionsComponent extends BaseListComponent implements OnInit {
  @Input() user: Contact;
  @Input() grnList: GoodsReceivedNote[];
  itemsPerPage = defaultValues.items_per_page;
  today = new Date();
  price = 50;
  contacts = new Array(20);
  constructor() {
    super();
  }
  ngOnInit() {}
}
