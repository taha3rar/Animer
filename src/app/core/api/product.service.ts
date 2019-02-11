import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/product');
  }

  saveImage(image: string): Observable<any> {
    const body = { image: image };
    return this.apiService.post('/image/product', body).pipe(map(data => data));
  }
}
