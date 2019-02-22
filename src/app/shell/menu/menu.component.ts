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
    icontype: 'dashboard'
  },
  // {
  //   path: '/transaction/list',
  //   title: 'Transactions',
  //   type: 'link',
  //   icontype: 'compare_arrows',
  //   neededPermission: 'list-transactions'
  // },
  {
    path: '/order/list',
    title: 'Orders',
    type: 'link',
    icontype: 'all_inclusive'
  },
  {
    path: '/invoice/list',
    title: 'Proforma Invoices',
    type: 'link',
    icontype: 'receipt'
  },
  {
    path: '/product/list',
    title: 'Products',
    type: 'link',
    icontype: 'spa',
    neededPermission: 'list-products'
  },
  {
    path: '/client/list',
    title: 'Clients',
    type: 'link',
    icontype: 'people',
    neededPermission: 'list-clients'
  },
  {
    path: '/ecosystem/list',
    title: 'Ecosystems',
    type: 'link',
    icontype: 'group_work',
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
