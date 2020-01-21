import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Order } from '@app/core/models/order/order';

@Injectable()
export class OrderDataService {
  formSource = new BehaviorSubject(undefined);
  productListSource = new BehaviorSubject(undefined);
  orderSource = new BehaviorSubject(undefined);
  tourStepSource = new BehaviorSubject('suppliers');
  currentForm = this.formSource.asObservable();
  currentProductList = this.productListSource.asObservable();
  newOrder = this.orderSource.asObservable();
  currentTourStep = this.tourStepSource.asObservable();

  constructor() {}

  setForm(form: FormGroup) {
    this.formSource.next(form);
  }

  setProductList(productList: any[]) {
    this.productListSource.next(productList);
  }

  setNewOrder(order: Order) {
    this.orderSource.next(order);
  }

  setTourStep(step: string) {
    this.tourStepSource.next(step);
  }
}
