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
    }
    return undefined;
  }
}
