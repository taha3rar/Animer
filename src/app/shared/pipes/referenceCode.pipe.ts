import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '@avenews/agt-sdk';

@Pipe({ name: 'referenceCode' })
export class ReferenceCodePipe implements PipeTransform {
  transform(status: string): string {
    return Utils.getGrnReferenceCode(status);
  }
}
