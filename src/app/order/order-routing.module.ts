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
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { CurrentUserSuppliersResolver } from '@app/shared/resolvers/current-user-suppliers.resolver';
import { OrderPoResolver } from './resolvers/order-po.resolver';
import { OrderInvoiceResolver } from './resolvers/order-invoice.resolver';
import { OrderDocumentsResolver } from './resolvers/order-documents.resolver';
import { OrderListAsBuyerResolver } from './resolvers/order-list-as-buyer.resolver';
import { OrderListAsSellerResolver } from './resolvers/order-list-as-seller.resolver';
import { OrderGuard } from '../shared/guards/order.guard';
import { InvoiceGuard } from '../shared/guards/invoice.guard';
import { QuotationResolver } from './resolvers/quotation.resolver';
import { PermissionGuard } from '../shared/guards/permission.guard';
import { CurrentUserProgressResolver } from '@app/shared/resolvers/current-user-progress.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'order',
      component: OrdersListComponent,
      resolve: {
        orders: OrderListResolver,
        ordersAsBuyer: OrderListAsBuyerResolver,
        ordersAsSeller: OrderListAsSellerResolver,
        currentUser: CurrentUserResolver
      },
      canActivate: [PermissionGuard],
      data: {
        title: extract('Orders'),
        permission: 'list-orders'
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'order/generator/open',
      component: OrderGeneratorComponent,
      resolve: {
        buyer: CurrentUserResolver
      },
      canActivate: [PermissionGuard],
      data: {
        openOrder: true,
        permission: 'create-order'
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'order/generator/standard',
      component: OrderGeneratorComponent,
      resolve: {
        userProgress: CurrentUserProgressResolver,
        buyer: CurrentUserResolver,
        sellers: CurrentUserSuppliersResolver
      },
      canActivate: [PermissionGuard],
      data: {
        openOrder: false,
        permission: 'create-order'
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'order/generator/:id',
      component: OrderGeneratorComponent,
      canActivate: [OrderGuard],
      resolve: {
        order: OrderPoResolver
      },
      data: {
        openOrder: false
      }
    },
    {
      path: 'order/generator/open/:id',
      component: OrderGeneratorComponent,
      canActivate: [OrderGuard],
      resolve: {
        order: OrderPoResolver
      },
      data: {
        openOrder: true
      }
    },
    {
      path: 'order/generator/quotation/:id',
      component: OrderGeneratorComponent,
      resolve: {
        quotation: QuotationResolver
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'order/invoice/generator/:id',
      component: OrderGeneratorSellerComponent,
      resolve: {
        order: OrderPoResolver
      },
      canActivate: [PermissionGuard],
      data: {
        permission: 'create-invoice'
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'order/invoice/generator/draft/:id',
      component: OrderGeneratorSellerComponent,
      canActivate: [InvoiceGuard],
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
  providers: [OrderGuard, ConfirmationGuard, InvoiceGuard, PermissionGuard]
})
export class OrderRoutingModule {}
