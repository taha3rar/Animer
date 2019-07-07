import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/helpers/default_values';
import { AuthenticationService, UserService } from '@app/core';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent extends BaseListComponent implements OnInit {
  clients: Client[];
  page = 1;
  itemsPerPage = defaultValues.items_per_page;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    protected userService: UserService,
    protected router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(({ clients }) => {
      this.clients = clients.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.clients.slice();
    if (!sort.active || sort.direction === '') {
      this.clients = data;
      return;
    }

    this.clients = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'company':
          return super.compare(a.company_name, b.company_name, isAsc);
        case 'contactName':
          return super.compare(a.first_name + a.last_name, b.first_name + b.last_name, isAsc);
        case 'type':
          return super.compare(a.role, b.role, isAsc);
        default:
          return 0;
      }
    });
  }

  get isInvited() {
    return this.authService.isInvited;
  }
}
