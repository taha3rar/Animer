import { Component, OnInit } from '@angular/core';
import { Ecosystem } from '@app/core/models/ecosystem';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { EcosystemService } from '@app/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-ecosystems-list',
  templateUrl: './ecosystems-list.component.html',
  styleUrls: ['./ecosystems-list.component.scss']
})
export class EcosystemsListComponent extends BaseListComponent implements OnInit {
  ecosystems: Ecosystem[];
  searchTerm: string;

  constructor(private route: ActivatedRoute, private ecosystemService: EcosystemService, protected router: Router) {
    super(ecosystemService, router, {
      deleteText: 'Once deleted, you will not be able to recover this ecosystem!',
      pageName: 'ecosystems'
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ ecosystems }) => {
      this.ecosystems = ecosystems.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.ecosystems.slice();
    if (!sort.active || sort.direction === '') {
      this.ecosystems = data;
      return;
    }

    this.ecosystems = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'title':
          return super.compare(a.name, b.name, isAsc);
        case 'type':
          return super.compare(a.type, b.type, isAsc);
        case 'clientsNumber':
          return super.compare(a.participants.length, b.participants.length, isAsc);
        default:
          return 0;
      }
    });
  }
}
