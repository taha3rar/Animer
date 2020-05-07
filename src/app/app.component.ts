import { Component, OnInit, HostListener, AfterContentChecked } from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  NavigationStart,
  Event,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/authentication/authentication.service';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Location } from '@angular/common';
import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
import { Intercom } from 'ng-intercom';
import { SpinnerToggleService } from './shared/services/spinner-toggle.service';

const log = new Logger('App');
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SpinnerToggleService]
})
export class AppComponent implements OnInit {
  userValidation = false;
  showSpinner: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private location: Location,
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private spinnerToggleService: SpinnerToggleService,
    // do not remove the analytics injection, even if the call in ngOnInit() is removed
    // this injection initializes page tracking through the router
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private i18nService: I18nService,
    public intercom: Intercom
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinnerToggleService.showSpinner();
      }
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        this.spinnerToggleService.hideSpinner();
      }
    });
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.spinnerToggleService.spinnerStatus.subscribe(state => {
      this.showSpinner = state;
    });

    log.debug('init');

    this.angulartics2GoogleAnalytics.eventTrack(environment.version, { category: 'App initialized' });

    if (this.authenticationService.credentials) {
      this.intercom.boot({
        app_id: environment.intercom.app_id,
        name:
          this.authenticationService.credentials.user.personal_information.first_name +
          ' ' +
          this.authenticationService.credentials.user.personal_information.last_name,
        email: this.authenticationService.credentials.user.email,
        phone: this.authenticationService.credentials.user.personal_information.phone_number,
        user_id: this.authenticationService.credentials.user._id,
        role: this.authenticationService.credentials.user.roles[0],
        client: this.authenticationService.credentials.user.roles.includes('client'),
        widget: {
          activator: '#intercom'
        }
      });
    } else {
      this.intercom.boot({
        app_id: environment.intercom.app_id,
        widget: {
          activator: '#intercom'
        }
      });
    }

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
    // Set permissions on every refresh
    this.authenticationService.setCurrentPermissions();
  }
}
