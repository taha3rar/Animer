import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-generator-seller',
  templateUrl: './order-generator-seller.component.html',
  styleUrls: ['./order-generator-seller.component.scss']
})
export class OrderGeneratorSellerComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
