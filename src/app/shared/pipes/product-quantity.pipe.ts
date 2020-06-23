import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Utils } from '@avenews/agt-sdk';

@Pipe({
  name: 'productQuantity'
})
export class ProductQuantityPipe implements PipeTransform {
  constructor() {}
  transform(products: any[]) {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].quantity;
    }
    return Utils.getDecimalString(sum);
  }
}
