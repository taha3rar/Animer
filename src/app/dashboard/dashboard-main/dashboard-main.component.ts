import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Counter } from '../models/counter';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  counter: Counter;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.route.data.subscribe(({ counter }) => {
      this.counter = counter;
    });
  }

  get username() {
    if (this.authenticationService.credentials) {
      return this.authenticationService.credentials.user.personal_information.first_name;
    }

    return null;
  }
}
