import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Credentials } from '@app/core/models/user/login-models';
import {
  Router,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  NavigationStart,
  Event,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  credentials: Credentials;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.credentials = this.authenticationService.credentials;
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationEnd) {
        if (this.router.url !== '/login') {
          (<any>window).Intercom('update', {
            app_id: 'zjpiv02o',
            last_request_at: Date.now(),
            email: this.credentials.user.email
          });
        } else {
          (<any>window).Intercom('boot', {
            app_id: 'zjpiv02o'
          });
        }
      }
    });
  }
}
