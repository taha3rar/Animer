import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiProduct'
})
export class MultiProductPipe implements PipeTransform {
  transform(products: any[]) {
    if (products.length > 1) {
      return 'Multiple Products';
    } else {
      return products[0].name;
    }
  }
}
