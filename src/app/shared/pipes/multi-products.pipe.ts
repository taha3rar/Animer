import { Pipe, PipeTransform } from '@angular/core';

import { Utils } from '@avenews/agt-sdk';

@Pipe({
  name: 'multiProduct'
})
export class MultiProductPipe implements PipeTransform {
  transform(products: any[]) {
    return Utils.getMultiProductString(products);
  }
}
