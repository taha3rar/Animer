import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(status: string): string {
    if (status) {
      // "N/A" | "Partially Paid" | "Paid" | "Awaiting Payment"
      if (status === 'N/A') {
        return 'status status-gray';
      } else if (status.toLowerCase() === 'paid') {
        return 'status status-green';
      } else if (status.toLowerCase() === 'partially paid') {
        return 'status status-blue';
      } else if (status.toLowerCase() === 'awaiting payment') {
        return 'status status-orange';
      }
    }
  }
}
