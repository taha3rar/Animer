import { Pipe, PipeTransform } from '@angular/core';
import { GoodsReceivedNoteProduct, Utils } from '@avenews/agt-sdk';

@Pipe({
  name: 'measurement'
})
export class MeasurementPipe implements PipeTransform {
  transform(products: GoodsReceivedNoteProduct[], quanity: number) {
    return Utils.getMultipleMeasurementString(products, quanity);
  }
}
