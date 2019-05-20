import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
