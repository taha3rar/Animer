import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Credentials } from '@app/core/models/user/login-models';

declare const $: any;

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  neededPermission?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'icon-dashboard'
  },
  {
    path: '/contact',
    title: 'Contacts',
    type: 'link',
    icontype: 'icon-clients'
  },
  {
    path: '/grn',
    title: 'Goods Receive Note',
    type: 'link',
    icontype: 'icon-grn'
  },
  {
    path: '/finance',
    title: 'Finance',
    type: 'link',
    icontype: 'icon-finance'
  }
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: RouteInfo[];
  currentCredentials: Credentials;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.currentCredentials = this.authService.credentials;

    this.menuItems = ROUTES;
  }
  hideSidebar() {
    if ($('.navbar-collapse').is(':visible')) {
      $('.navbar-collapse').collapse('hide');
    }
  }
}
