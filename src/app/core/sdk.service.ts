import { Injectable } from '@angular/core';
import { ApiService } from '@avenews/agt-sdk';
import { AuthenticationService } from './authentication/authentication.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdkService extends ApiService {
  constructor(private authService: AuthenticationService) {
    super(environment.new_api_url);

    if (this.authService.credentials.token) {
      this.setToken(this.authService.credentials.token);
    }
  }
}
