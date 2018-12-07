import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundUp'
})
export class RoundUpPipe implements PipeTransform {
  transform(input: number) {
    return Math.ceil(input);
  }
}
