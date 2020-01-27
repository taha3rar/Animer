import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Order } from '@app/core/models/order/order';
import { Intercom } from 'ng-intercom';
import { environment } from '@env/environment';

@Injectable()
export class OrderDataService {
  formSource = new BehaviorSubject(undefined);
  productListSource = new BehaviorSubject(undefined);
  orderSource = new BehaviorSubject(undefined);
  tourStepSource = new BehaviorSubject(undefined);
  currentForm = this.formSource.asObservable();
  currentProductList = this.productListSource.asObservable();
  newOrder = this.orderSource.asObservable();
  currentTourStep = this.tourStepSource.asObservable();
  tours = environment.intercom.tours;
  tourDictionary = {
    suppliers: this.tours.orders.generator.suppliersTour,
    products: this.tours.orders.generator.productsTour,
    order: this.tours.orders.generator.orderTour,
    review: this.tours.orders.generator.reviewTour
  };
  tourEnabled: boolean;
  presentStep: string;

  constructor(public intercom: Intercom) {}

  setForm(form: FormGroup) {
    this.formSource.next(form);
  }

  setProductList(productList: any[]) {
    this.productListSource.next(productList);
  }

  setNewOrder(order: Order) {
    this.orderSource.next(order);
  }

  setEnableTour(trigger: boolean) {
    this.tourEnabled = trigger;
  }

  setGeneratorStep(step: string) {
    this.presentStep = step;
  }

  triggerTourStep(manualTrigger?: boolean) {
    if (this.tourEnabled || manualTrigger) {
      this.intercom.startTour(this.tourDictionary[this.presentStep]);
    }
  }
}
