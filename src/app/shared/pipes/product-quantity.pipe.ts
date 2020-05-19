import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'productQuantity'
})
export class ProductQuantityPipe implements PipeTransform {
  constructor(private _decimalPipe: DecimalPipe) {}
  transform(products: any[]) {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].quantity;
    }
    return this._decimalPipe.transform(sum, '1.2-2');
  }
}
