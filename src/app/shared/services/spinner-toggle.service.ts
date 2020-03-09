import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerToggleService {
  spinnerToggle = new BehaviorSubject<boolean>(false);
  spinnerStatus = this.spinnerToggle.asObservable();
  constructor() {}

  public showSpinner() {
    this.spinnerToggle.next(true);
  }

  public hideSpinner() {
    this.spinnerToggle.next(false);
  }
}
