import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceBuyersResolver } from './resolvers/invoice-buyers.resolver';
import { InvoiceSellerResolver } from './resolvers/invoice-seller.resolver';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { ProductCurrentUserResolver } from './resolvers/products-currentUser.resolver';
import { InvoiceListAsBuyerResolver } from './resolvers/invoice-list-as-buyer.resolver';
import { InvoiceListAsSellerResolver } from './resolvers/invoice-list-as-seller.resolver';
import { ConfirmationGuard } from '@app/shared/guards/confirmation.guard';
import { InvoiceGuard } from '../shared/guards/invoice.guard';

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
      data: { title: extract('Invoices') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'invoice/generator',
      component: InvoiceGeneratorComponent,
      resolve: {
        clients: InvoiceBuyersResolver,
        seller: InvoiceSellerResolver,
        products: ProductCurrentUserResolver
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'invoice/generator/:id',
      component: InvoiceGeneratorComponent,
      canActivate: [InvoiceGuard],
      resolve: {
        invoice: InvoiceResolver,
        products: ProductCurrentUserResolver
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
  providers: [InvoiceGuard, ConfirmationGuard]
})
export class InvoiceRoutingModule {}
