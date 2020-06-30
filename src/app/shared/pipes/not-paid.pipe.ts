import { GoodsReceivedNote } from '@avenews/agt-sdk';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'notPaid' })
export class NotPaidPipe implements PipeTransform {
  transform(grns: GoodsReceivedNote[]) {
    return grns.filter((grn: GoodsReceivedNote) => {
      return grn.paymentStatus !== 'paid';
    });
  }
}
