import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceBuyersResolver } from './resolvers/invoice-buyers.resolver';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { CurrentUserProductsResolver } from '@app/shared/resolvers/current-user-products.resolver';
import { InvoiceListAsBuyerResolver } from './resolvers/invoice-list-as-buyer.resolver';
import { InvoiceListAsSellerResolver } from './resolvers/invoice-list-as-seller.resolver';
import { ConfirmationGuard } from '@app/shared/guards/confirmation.guard';
import { InvoiceGuard } from '../shared/guards/invoice.guard';
import { PermissionGuard } from '../shared/guards/permission.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'invoice/list',
      component: InvoicesListComponent,
      resolve: {
        invoices: InvoiceListResolver,
        invoicesAsBuyer: InvoiceListAsBuyerResolver,
        invoicesAsSeller: InvoiceListAsSellerResolver
      },
      canActivate: [PermissionGuard],
      data: {
        title: extract('Invoices'),
        permission: 'list-invoices'
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'invoice/generator',
      component: InvoiceGeneratorComponent,
      resolve: {
        buyers: InvoiceBuyersResolver,
        seller: CurrentUserResolver,
        products: CurrentUserProductsResolver
      },
      canActivate: [PermissionGuard],
      data: {
        permission: 'create-invoice'
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'invoice/generator/:id',
      component: InvoiceGeneratorComponent,
      canActivate: [InvoiceGuard],
      resolve: {
        invoice: InvoiceResolver,
        products: CurrentUserProductsResolver
      }
    },
    {
      path: 'invoice/:id',
      component: InvoiceComponent,
      canActivate: [InvoiceGuard],
      resolve: {
        invoice: InvoiceResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [InvoiceGuard, ConfirmationGuard, PermissionGuard]
})
export class InvoiceRoutingModule {}
