import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'order/list',
      component: OrdersListComponent,
      resolve: { orders: OrderListResolver },
      data: { title: extract('Orders') }
    },
    {
      path: 'order/:id',
      component: OrderComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrderRoutingModule {}
