import { AGTError } from '@avenews/agt-sdk';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handleError(e: AGTError) {
    return Swal.fire({
      icon: 'error',
      title: `Error code: ${e.errorCode}`,
      text: e.message
    });
  }
}
