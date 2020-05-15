import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '@avenews/agt-sdk';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {
  transform(input: string) {
    return Utils.toDateString(new Date(input));
  }
}
