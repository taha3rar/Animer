import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EcosystemService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/ecosystem');
  }
}
