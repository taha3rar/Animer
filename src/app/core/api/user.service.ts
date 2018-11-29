import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUser(id: string) {
    const params = new HttpParams();
    params.set('id', id);
    return this.apiService.get('/user/', params).pipe(data => {
      return data;
    });
  }

  getAllUsers() {
    return this.apiService.get('/user/').pipe(data => {
      return data;
    });
  }
}
