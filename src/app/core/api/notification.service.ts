import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from '..';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/notification');
  }

  markAsRead(id: string): Observable<Notification> {
    return this.apiService.put(`${this.path}/${id}/read`).pipe(map(data => data));
  }

  getUrl(notification: Notification): String {
    if (notification.link) {
      return notification.link;
    } else {
      switch (notification.topic.name) {
        case 'new-invoice-receiver':
          return `/invoice/${notification.topic._id}`;
        case 'new-order-receiver':
          return `order/invoice/generator/${notification.topic._id}`;
        case 'new-document':
          return `/order/${notification.topic._id}`;
        case 'new-contract':
          return `client/${notification.emitter._id}`;
        case 'new-quote-request':
          return `quote-request/quotation-generator/${notification.topic._id}`;
        case 'new-quotation':
          return `quote-request/${notification.topic.subtopic._id}`;
        case 'quotation-accepted':
          return `quote-request/quotation/${notification.topic.subtopic._id}`;
        default:
          return undefined;
      }
    }
  }
}
