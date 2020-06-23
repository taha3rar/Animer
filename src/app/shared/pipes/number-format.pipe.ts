import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '@avenews/agt-sdk';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(number: any): string {
    return Utils.getDecimalString(number);
  }
}
