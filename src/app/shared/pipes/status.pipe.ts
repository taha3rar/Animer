import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(status: string): string {
    if (!status) {
      return '';
    }

    if (status.toLowerCase() === 'paid') {
      // can add any status that should success with ||
      return 'status status-green';
    } else if (status.toLowerCase() === 'partially-paid') {
      return 'status status-blue';
    } else if (status.toLowerCase() === 'awaiting') {
      return 'status status-orange';
    }

    return 'status status-gray';
  }
}
