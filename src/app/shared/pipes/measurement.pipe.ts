import { Pipe, PipeTransform } from '@angular/core';
import { GoodsReceivedNoteProduct } from '@avenews/agt-sdk';

@Pipe({
  name: 'measurement'
})
export class MeasurementPipe implements PipeTransform {
  transform(products: GoodsReceivedNoteProduct[], quanity: number) {
    if (products && products[0]) {
      const measures = Array.from(new Set(products.map(item => item.measurement))); // puts only unique values in an array
      if (measures.length > 1) {
        // if there is array size is bigger than 1 means that there are multiple measures
        return 'Multiple Measurments';
      } else {
        return quanity; // if the array size is only 1 then its only got 1 measurement type.
      }
    } else {
      return '';
    }
  }
}
