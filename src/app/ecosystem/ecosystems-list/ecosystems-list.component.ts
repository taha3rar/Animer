import { Component, OnInit } from '@angular/core';
import { Ecosystem } from '@app/core/models/ecosystem';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { EcosystemService } from '@app/core';

@Component({
  selector: 'app-ecosystems-list',
  templateUrl: './ecosystems-list.component.html',
  styleUrls: ['./ecosystems-list.component.scss']
})
export class EcosystemsListComponent extends BaseListComponent implements OnInit {
  ecosystems: Ecosystem[];
  page = 1;

  constructor(private route: ActivatedRoute, private ecosystemService: EcosystemService, protected router: Router) {
    super(ecosystemService, router, {
      deleteText: 'Once deleted, you will not be able to recover this ecosystem!'
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ ecosystems }) => {
      this.ecosystems = ecosystems;
    });
  }
}
