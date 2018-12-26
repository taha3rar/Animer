import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-generator',
  templateUrl: './order-generator.component.html',
  styleUrls: ['./order-generator.component.scss']
})
export class OrderGeneratorComponent implements OnInit {
  term: any;

  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
