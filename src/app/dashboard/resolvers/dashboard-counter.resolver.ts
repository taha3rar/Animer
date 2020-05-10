import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Counter } from '../models/counter';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { Contact } from '@avenews/agt-sdk';

@Injectable()
export class DashboardCounterResolver implements Resolve<Counter> {
  constructor(private sdkService: SdkService) {}

  resolve(): Counter {
    const counter: Counter = new Counter();

    from(this.sdkService.getMyContacts()).subscribe((contacts: Partial<Contact>[]) => {
      counter.contacts = contacts.length;
    });

    return counter;
  }
}
