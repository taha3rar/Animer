import { Injectable } from '@angular/core';
import swal from 'sweetalert';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  showAlert($msg: string) {
    $.notify(
      {
        icon: 'notifications',
        message: $msg
      },
      {
        type: 'success',
        timer: 5000,
        placement: {
          from: 'top',
          align: 'right'
        },
        offset: 78
      }
    );
  }

  showAlertDanger($msg: string) {
    $.notify(
      {
        icon: 'notifications',
        message: $msg
      },
      {
        type: 'danger',
        timer: 5000,
        placement: {
          from: 'top',
          align: 'right'
        },
        offset: 78
      }
    );
  }
  showAlertBack() {
    return swal({
      text: 'Are you sure you want to leave this page? All information will be lost!',
      buttons: ['Cancel', 'Yes'],
      icon: 'warning'
    });
  }
}
