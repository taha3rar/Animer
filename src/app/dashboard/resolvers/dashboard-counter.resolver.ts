import { Injectable } from '@angular/core';
import { AuthenticationService, UserService } from '@app/core';
import { Resolve } from '@angular/router';
import { Counter } from '../models/counter';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class DashboardCounterResolver implements Resolve<Counter> {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  resolve(): Counter {
    const currentUserId = this.authService.currentUserId;
    const counter: Counter = new Counter();

    this.userService.getClientsByUser(currentUserId).subscribe((clients: Client[]) => {
      counter.clients = clients.length;
    });

    return counter;
  }
}
