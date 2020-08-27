import { Injectable } from '@angular/core';
import { ApiService } from '@avenews/agt-sdk';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdkService extends ApiService {
  constructor() {
    super('sad');
  }
}
