import { Component, OnInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-agricultural-product-generator',
  templateUrl: './agricultural-product-generator.component.html',
  styleUrls: ['./agricultural-product-generator.component.scss']
})
export class AgriculturalProductGeneratorComponent implements OnInit {
  productImage = defaultValues.agri_picture;

  constructor() {}

  ngOnInit() {}
}
