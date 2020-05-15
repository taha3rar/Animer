import { Pipe, PipeTransform } from '@angular/core';
import { Utils, PaymentStatus } from '@avenews/agt-sdk';

@Pipe({ name: 'paymentStatus' })
export class PaymentStatusPipe implements PipeTransform {
  transform(status: PaymentStatus): string {
    return Utils.getPaymentStatus(status);
  }
}
