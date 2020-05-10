import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Passwords } from '../models/user/passwords';
import { UserRegistration } from '../models/user/user-registration';
import { DpoInformation } from '../models/user/dpo-info';
import { DpoDocuments } from '../models/user/dpo-documents';
import { User } from '@avenews/agt-sdk';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(protected _apiService: ApiService) {
    super(_apiService, '/user');
  }

  saveInvitedClient(client: User): Observable<any> {
    return this.apiService.post('/user/client', client).pipe(map(data => data));
  }

  saveNewUser(client: UserRegistration): Observable<User> {
    return this.apiService.post('/user/registration', client).pipe(map(data => data));
  }

  saveReviewAccountProgress(id: string): Observable<any> {
    return this.apiService.post(`${this.path}/${id}/reviewed`).pipe(map(data => data));
  }

  oAuthRegistration(socialUserInfo: any, network: string): Observable<any> {
    if (network === 'facebook') {
      return this.apiService.post('/user/oauth/registration/facebook', socialUserInfo).pipe(map(data => data));
    }
    if (network === 'google') {
      return this.apiService.post('/user/oauth/registration/google', socialUserInfo).pipe(map(data => data));
    }
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

  saveClientIdPicture(image: string): Observable<any> {
    const body = { image: image };
    return this.apiService.post('/image/client', body).pipe(map(data => data));
  }

  update(id: string, user: User): Observable<User> {
    return super.update(id, user).pipe(
      map(data => {
        // TODO: update the current user in authService
        return data;
      })
    );
  }

  changePassword(id: string, passwords: Passwords): Observable<User> {
    return this.apiService.put(`/user/${id}/password`, passwords).pipe(map(data => data));
  }

  updateNotifications(id: string, notifications: string[]): Observable<User> {
    return this.apiService.put(`/user/${id}`, { notifications: notifications }).pipe(map(data => data));
  }

  updateUserValidation(id: string): Observable<any> {
    return this.apiService.post(`/user/validate/${id}`).pipe(map(data => data));
  }

  saveUserDPOInformation(userDpoInfo: DpoInformation, id: string): Observable<any> {
    return this.apiService.post(`/user/${id}/dpo`, userDpoInfo).pipe(map(data => data));
  }

  saveDPODocuments(dpoDocs: DpoDocuments, id: string): Observable<any> {
    return this.apiService.post(`/user/${id}/dpo/document`, dpoDocs).pipe(map(data => data));
  }
}
