import { Component, OnInit } from '@angular/core';
import { Ecosystem } from '@app/core/models/ecosystem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ecosystems-list',
  templateUrl: './ecosystems-list.component.html',
  styleUrls: ['./ecosystems-list.component.scss']
})
export class EcosystemsListComponent implements OnInit {
  ecosystems: Ecosystem[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ ecosystems }) => {
      this.ecosystems = ecosystems;
    });
  }
}
