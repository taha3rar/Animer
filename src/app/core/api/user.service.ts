import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user/user';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Passwords } from '../models/user/passwords';
import { Client } from '../models/user/client';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(protected _apiService: ApiService) {
    super(_apiService, '/user');
  }

  getClientsByUser(id: string): Observable<Client[]> {
    return this.apiService.get(`${this.path}/${id}/client`).pipe(map(data => data));
  }

  getSuppliersFromUser(id: string): Observable<User[]> {
    return this.apiService.get(`${this.path}/${id}/client`).pipe(map(data => data));
  }

  saveInvitedClient(client: User): Observable<any> {
    return this.apiService.post('/user/client', client).pipe(map(data => data));
  }

  // TODO: Type return object properly, not use any. Check in the backend. Also move this method to another service
  saveProfileImage(image: string): Observable<any> {
    const body = { image: image };
    return this.apiService.post('/image/user', body).pipe(map(data => data));
  }

  // TODO: Type return object properly, not use any. Check in the backend. Also move this method to another service
  saveCompanyImage(image: string): Observable<any> {
    const body = { image: image };
    return this.apiService.post('/image/company', body).pipe(map(data => data));
  }

  update(user: User): Observable<User> {
    return super.update(user).pipe(
      map(data => {
        // TODO: update the current user in authService
        return data.user;
      })
    );
  }
  // //Save new invited client
  // saveInvitedClient(client): Observable<any> {
  //   return this.apiService.post('/user/client', client)
  //     .pipe(map(data => data));
  // }

  changePassword(id: string, passwords: Passwords): Observable<User> {
    return this.apiService.put(`/user/${id}/password`, passwords).pipe(map(data => data));
  }
}
