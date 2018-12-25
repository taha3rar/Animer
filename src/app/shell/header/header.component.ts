import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, I18nService } from '@app/core';
import { Credentials } from '@app/core/models/user/login-models';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  credentials: Credentials;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.credentials = this.authenticationService.credentials;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
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

    return '../../../assets/img/profile-img.jpg'; // TODO: Change this default picture
  }
}

$(document).on('click', '.dropdown-submenu span', function(e: any) {
  $(this)
    .next('ul')
    .toggle();
  e.stopPropagation();
  e.preventDefault();
});

$(document).on('click', '.sub-ul span', function() {
  $('.sub-ul').hide();
});
