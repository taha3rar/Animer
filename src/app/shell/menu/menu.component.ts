import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Credentials } from '@app/core/models/user/login-models';

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
    icontype: 'icon-new-platform-icons---dashboard'
  },
  {
    path: '/order/list',
    title: 'Orders',
    type: 'link',
    icontype: 'icon-new-platform-icons---orders'
  },
  {
    path: '/quote-request/list',
    title: 'Quote Requests',
    type: 'link',
    icontype: 'icon-new-platform-icons---qr'
  },
  {
    path: '/invoice/list',
    title: 'Proforma Invoices',
    type: 'link',
    icontype: 'icon-new-platform-icons---pi'
  },
  {
    path: '/product/list',
    title: 'Products',
    type: 'link',
    icontype: 'icon-new-platform-icons---products',
    neededPermission: 'list-products'
  },
  {
    path: '/client/list',
    title: 'Clients',
    type: 'link',
    icontype: 'icon-new-platform-icons---clients',
    neededPermission: 'list-clients'
  },
  {
    path: '/ecosystem/list',
    title: 'Ecosystems',
    type: 'link',
    icontype: 'icon-new-platform-icons---ecosystems',
    neededPermission: 'list-ecosystems'
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

    if (this.currentCredentials && this.currentCredentials.user.permissions) {
      this.menuItems = ROUTES.filter(mi =>
        mi.neededPermission ? this.currentCredentials.user.permissions.some(p => p === mi.neededPermission) : true
      );
    }
  }
}
