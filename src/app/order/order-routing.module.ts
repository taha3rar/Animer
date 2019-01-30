import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderGeneratorComponent } from './order-generator/order-generator.component';
import { OrderGeneratorSellerComponent } from './order-generator-seller/order-generator-seller.component';
import { OrderBuyerResolver } from './resolvers/order-buyer.resolver';
import { OrderSellersResolver } from './resolvers/order-sellers.resolver';
import { OrderPoResolver } from './resolvers/order-po.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'order/list',
      component: OrdersListComponent,
      resolve: { orders: OrderListResolver },
      data: { title: extract('Orders') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'order/generator',
      component: OrderGeneratorComponent,
      resolve: {
        buyer: OrderBuyerResolver,
        sellers: OrderSellersResolver
      }
    },
    {
      path: 'order/generator/:id',
      component: OrderGeneratorComponent,
      resolve: {
        order: OrderPoResolver
      }
    },
    {
      path: 'order/invoice/generator/:id',
      component: OrderGeneratorSellerComponent,
      resolve: {
        order: OrderPoResolver
      }
    },
    {
      path: 'order/:id',
      component: OrderComponent,
      resolve: {
        order: OrderPoResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrderRoutingModule {}
