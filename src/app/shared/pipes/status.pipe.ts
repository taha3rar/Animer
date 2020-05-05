import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(status: string): string {
    if (status.toLowerCase() === 'paid') {
      // can add any status that should success with ||
      return 'status status-green';
    } else if (status.toLowerCase() === 'partially paid') {
      return 'status status-blue';
    } else if (status.toLowerCase() === 'awaiting payment') {
      return 'status status-orange';
    }
  }
}
