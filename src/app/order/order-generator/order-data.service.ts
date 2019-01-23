import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Product } from '@app/core/models/product';
import { Order } from '@app/core/models/order/order';

@Injectable()
export class OrderDataService {
  formSource = new BehaviorSubject(undefined);
  productListSource = new BehaviorSubject(undefined);
  orderSource = new BehaviorSubject(undefined);
  currentForm = this.formSource.asObservable();
  currentProductList = this.productListSource.asObservable();
  newOrder = this.orderSource.asObservable();

  constructor() {}

  setForm(form: FormGroup) {
    this.formSource.next(form);
  }

  setProductList(productList: Product[]) {
    this.productListSource.next(productList);
  }

  setNewOrder(order: Order) {
    this.orderSource.next(order);
  }
}
