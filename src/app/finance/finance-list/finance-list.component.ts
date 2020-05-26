import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defaultValues } from './../../shared/helpers/default_values';
import { Loan } from '@avenews/agt-sdk';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';

@Component({
  selector: 'app-finance-list',
  templateUrl: './finance-list.component.html',
  styleUrls: ['./finance-list.component.scss']
})
export class FinanceListComponent extends BaseListComponent implements OnInit {
  itemsPerPage = defaultValues.items_per_page;
  loans: Loan[];
  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(({ financeList }) => {
      this.loans = financeList;
    });
  }
}
