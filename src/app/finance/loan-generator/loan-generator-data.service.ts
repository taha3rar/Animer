import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoanGeneratorDataService {
  formSource = new BehaviorSubject(undefined);
  currentForm = this.formSource.asObservable();

  constructor() {}

  setForm(form: FormGroup) {
    this.formSource.next(form);
  }
}
