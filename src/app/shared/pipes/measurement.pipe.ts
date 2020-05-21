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
      } else if (measures.length === 1 && quanity === 1 && measures[0].toLowerCase() === 'unit') {
        // if the measurement unit is only one and it's equal to unit and the quantity is one then return Unit
        return quanity + ' Unit';
      } else if (measures.length === 1 && quanity > 1 && measures[0].toLowerCase() === 'unit') {
        // if the measurement unit is only one and it's equal to unit and the quantity is greater than one then return Units
        return quanity + ' Units';
      } else {
        return quanity + ` ${measures[0]}`; // if the array size is only 1 then its only got 1 measurement type.
      }
    } else {
      return '';
    }
  }
}
