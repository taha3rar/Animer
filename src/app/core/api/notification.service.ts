import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from '..';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { OrderService } from './order.service';
import { Order } from '../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {
  constructor(protected apiService: ApiService, private orderService: OrderService) {
    super(apiService, '/notification');
  }

  markAsRead(id: string): Observable<Notification> {
    return this.apiService.put(`${this.path}/${id}/read`).pipe(map(data => data));
  }

  setLinks(notifications: Notification[]) {
    for (let index = 0; index < notifications.length; index++) {
      const notification = notifications[index];

      // if its a PO, we need to send the user to the PI generator
      // but if PI was already created, the user should be redirected to the PI view
      if (notification.type === 'purchase-order') {
        this.orderService.get(notification.object_id).subscribe((order: Order) => {
          if (order.invoice && order.invoice._id) {
            notification.link = `order/${notification.object_id}`;
          } else {
            notification.link = `order/invoice/generator/${notification.object_id}`;
          }
        });
      }
    }
  }

  getUrl(notification: Notification): String {
    if (notification.link) {
      return notification.link;
    } else {
      switch (notification.type) {
        case 'proforma-invoice':
          return `/invoice/${notification.object_id}`;
        case 'purchase-order':
          return `order/invoice/generator/${notification.object_id}`;
        case 'document':
          return `/order/${notification.object_id}`;
        case 'contract':
          return `client/${notification.emitter._id}`;
        case 'quote-request':
        case 'quotation':
          return `quote-request/${notification.object_id}`;
        default:
          return undefined;
      }
    }
  }
}
