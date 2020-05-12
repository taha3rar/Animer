import { Component, OnInit, Input } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { Contact } from '@avenews/agt-sdk';
import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';
@Component({
  selector: 'app-contact-transactions',
  templateUrl: './contact-transactions.component.html',
  styleUrls: ['./contact-transactions.component.scss']
})
export class ContactTransactionsComponent extends BaseListComponent implements OnInit {
  @Input() contact: Contact;
  @Input() grnList: GoodsReceivedNote[];
  itemsPerPage = defaultValues.items_per_page;
  today = new Date();
  price = 50;
  constructor() {
    super();
  }
  ngOnInit() {}
}
