import { defaultValues } from './../../shared/helpers/default_values';
import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.scss']
})
export class GrnListComponent extends BaseListComponent implements OnInit {
  itemsPerPage = defaultValues.items_per_page;
  tooltips = tooltips.grn;
  today = new Date();
  price = 50;
  grns = new Array(20);
  status = 'Paid';
  emptyList = false;
  constructor() {
    super();
  }

  ngOnInit() {}
}
