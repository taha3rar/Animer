import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  tabToggle = new BehaviorSubject<number>(-1);
  getTab = this.tabToggle.asObservable();
  constructor() {}

  public saveIndexByName(tabName: string) {
    let index: number;
    switch (tabName) {
      case 'dashboard':
        index = 0;
        break;
      case 'contact':
        index = 1;
        break;
      case 'grn':
        index = 2;
        break;
      case 'finance':
        index = 3;
        break;
      case 'payment':
        index = 4;
        break;
    }
    this.tabToggle.next(index);
  }
}
