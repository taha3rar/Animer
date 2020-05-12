import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productQuantity'
})
export class ProductQuantityPipe implements PipeTransform {
  transform(products: any[]) {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].quantity;
    }
    return sum;
  }
}
