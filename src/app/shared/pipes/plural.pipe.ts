import { Pipe, PipeTransform } from '@angular/core';
import { MeasurementType } from '@avenews/agt-sdk/lib/types/shared';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {
  transform(measure: string, num: number) {
    if (measure.toLowerCase() === 'unit' && num > 1) {
      return 'Units';
    } else {
      return measure;
    }
  }
}
