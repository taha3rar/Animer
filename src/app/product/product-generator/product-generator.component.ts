import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-generator',
  templateUrl: './product-generator.component.html',
  styleUrls: ['./product-generator.component.scss']
})
export class ProductGeneratorComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
