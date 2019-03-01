import { Component, OnInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-processed-product-generator',
  templateUrl: './processed-product-generator.component.html',
  styleUrls: ['./processed-product-generator.component.scss']
})
export class ProcessedProductGeneratorComponent implements OnInit {
  productImage = defaultValues.processed_picture;
  constructor() {}

  ngOnInit() {}
}
