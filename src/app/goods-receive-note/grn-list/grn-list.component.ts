import { ActivatedRoute } from '@angular/router';
import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';
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
  grnList: GoodsReceivedNote[] = [];
  tooltips = tooltips.grn;
  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(({ grns }) => {
      this.grnList = grns;
    });
  }
}
