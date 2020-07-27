import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Counter } from '../models/counter';
import { AuthenticationService } from '@app/core';
import { User } from '@avenews/agt-sdk';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  counter: Counter;
  currentUser: User;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.route.data.subscribe(({ counter, currentUser }) => {
      this.counter = counter;
      this.currentUser = currentUser;
    });
  }

  get username() {
    if (this.authenticationService.credentials) {
      return this.authenticationService.credentials.user.personalInformation.firstName;
    }

    return null;
  }
}
