import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Ecosystem } from '@app/core/models/ecosystem';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss']
})
export class EcosystemComponent implements OnInit {
  ecosystem: Ecosystem;
  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ ecosystem }) => {
      this.ecosystem = ecosystem;
    });
  }

  back() {
    this.location.back();
  }

  get ownedBy() {
    return `${this.ecosystem.created_by.first_name} ${this.ecosystem.created_by.last_name}`;
  }
}
