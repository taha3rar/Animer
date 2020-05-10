import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { User } from '@avenews/agt-sdk';
@Component({
  selector: 'app-contact-transactions',
  templateUrl: './contact-transactions.component.html',
  styleUrls: ['./contact-transactions.component.scss']
})
export class ContactTransactionsComponent extends BaseListComponent implements OnInit {
  @Input() user: User;
  itemsPerPage = defaultValues.items_per_page;
  today = new Date();
  price = 50;
  contacts = new Array(20);
  constructor() {
    super();
  }
  ngOnInit() {}
}
