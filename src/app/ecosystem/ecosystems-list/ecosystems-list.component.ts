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
  page = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.ecosystems = this.route.snapshot['ecosystems'];
    console.log(this.ecosystems);
  }

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this ecosystem!',
      icon: 'warning'
    });
  }
}
