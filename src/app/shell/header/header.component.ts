import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

import { AuthenticationService, I18nService } from '@app/core';
import { Credentials } from '@app/core/models/user/login-models';
import { defaultValues } from '@app/shared/helpers/default_values';
import { User } from '@app/core/models/user/user';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  credentials: Credentials;
  currentUser: User;
  userProgress = {};
  tooltips = tooltips.dashboard;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.credentials = this.authenticationService.credentials;

    this.route.data.subscribe(({ currentUser, progress }) => {
      this.userProgress = progress;
      this.currentUser = currentUser;
    });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
      // reset intercom
      (<any>window).Intercom('shutdown');
    });
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    if (this.credentials) {
      return `${this.credentials.user.personal_information.first_name} ${
        this.credentials.user.personal_information.last_name
      }`;
    }

    return null;
  }

  get profilePicture(): string | null {
    if (this.credentials && this.credentials.user && this.credentials.user.personal_information.profile_picture) {
      return this.credentials.user.personal_information.profile_picture;
    }

    return defaultValues.profile_picture;
  }
}

$(window).ready(function() {
  $('body').on('click', 'ul > li.dropdown-submenu', function(e: any) {
    $(this)
      .find('ul')
      .toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});
$(document).on('click', '.sub-ul span', function() {
  $('.sub-ul').hide();
});
