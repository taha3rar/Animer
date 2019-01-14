import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Order } from '../models/order/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/order');
  }

  getByUserIdAndClientId(userId: string, clientId: string): Observable<Order[]> {
    console.log('here');
    return this.apiService.get(`/user/${userId}/client/${clientId}/order`).pipe(map(data => data));
  }
}
