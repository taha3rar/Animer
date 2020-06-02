import { DashboardDataService } from './../../shared/services/dashboard-data-service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Credentials } from '@avenews/agt-sdk';

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
    icontype: 'icon-contacts'
  },
  {
    path: '/grn',
    title: 'Goods Received',
    type: 'link',
    icontype: 'icon-grn'
  },
  {
    path: '/finance',
    title: 'Finance',
    type: 'link',
    icontype: 'icon-finance'
  },
  {
    path: '/payments',
    title: 'Payments',
    type: 'link',
    icontype: 'icon-finance'
  }
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  menuItems: RouteInfo[];
  currentCredentials: Credentials;
  index: number;
  constructor(private authService: AuthenticationService, private dataService: DashboardDataService) {}
  ngOnInit() {
    this.currentCredentials = this.authService.credentials;
    this.menuItems = ROUTES;
  }
  ngAfterViewInit() {
    this.dataService.getTab.subscribe(index => {
      // controls the active class outside the path
      // 0 is dashboard
      // 1 is contacts
      // etc ...
      this.index = index;
    });
  }
  hideSidebar() {
    if ($('.navbar-collapse').is(':visible')) {
      $('.navbar-collapse').collapse('hide');
    }
  }
}
