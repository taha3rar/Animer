import { ConfirmationGuard } from './../shared/guards/confirmation.guard';
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
import { OrderInvoiceResolver } from './resolvers/order-invoice.resolver';
import { OrderDocumentsResolver } from './resolvers/order-documents.resolver';
import { OrderListAsBuyerResolver } from './resolvers/order-list-as-buyer.resolver';
import { OrderListAsSellerResolver } from './resolvers/order-list-as-seller.resolver';
import { CurrentUserResolver } from '@app/profile/resolvers/currentUser.resolver';
import { OrderGuard } from './guards/order.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'order/list',
      component: OrdersListComponent,
      resolve: {
        orders: OrderListResolver,
        ordersAsBuyer: OrderListAsBuyerResolver,
        ordersAsSeller: OrderListAsSellerResolver,
        currentUser: CurrentUserResolver
      },
      data: { title: extract('Orders') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'order/generator',
      component: OrderGeneratorComponent,
      resolve: {
        buyer: OrderBuyerResolver,
        sellers: OrderSellersResolver
      },
      canDeactivate: [ConfirmationGuard]
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
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'order/invoice/generator/draft/:id',
      component: OrderGeneratorSellerComponent,
      resolve: {
        invoice: OrderInvoiceResolver
      }
    },
    {
      path: 'order/:id',
      component: OrderComponent,
      canActivate: [OrderGuard],
      resolve: {
        order: OrderPoResolver,
        documents: OrderDocumentsResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrderGuard, ConfirmationGuard]
})
export class OrderRoutingModule {}
