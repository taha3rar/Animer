import { Pipe, PipeTransform } from '@angular/core';

import { Utils } from '@avenews/agt-sdk';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {
  transform(measure: string, num: number) {
    return Utils.getPluralString(measure, num);
  }
}
