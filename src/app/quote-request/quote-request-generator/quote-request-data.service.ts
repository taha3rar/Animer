import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class QuoteRequestDataService {
  targeted_sellers = new BehaviorSubject(undefined);
  currentTargeted_sellers = this.targeted_sellers.asObservable();

  constructor() {}

  setTargetedSellers(targeted_sellers: any[]) {
    this.targeted_sellers.next(targeted_sellers);
  }
}
