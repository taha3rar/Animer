import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(status: string): string {
    if (!status) {
      return 'status status-gray';
    }

    if (status.toLowerCase() === 'paid' || status === 'ACCEPTED') {
      // can add any status that should success with ||
      return 'status status-green';
    } else if (status.toLowerCase() === 'partially-paid') {
      return 'status status-blue';
    } else if (status.toLowerCase() === 'awaiting' || status === 'PENDING APPROVAL') {
      return 'status status-orange';
    } else if (status === 'DECLINED') {
      return 'status status-red';
    }
    return 'status status-gray';
  }
}
