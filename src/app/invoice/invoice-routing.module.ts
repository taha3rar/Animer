import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceBuyersResolver } from './resolvers/invoice-buyers.resolver';
import { InvoiceSellerResolver } from './resolvers/invoice-seller.resolver';
import { InvoiceResolver } from './resolvers/invoice.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'invoice/list',
      component: InvoicesListComponent,
      resolve: { invoices: InvoiceListResolver },
      data: { title: extract('Invoices') }
    },
    {
      path: 'invoice/generator',
      component: InvoiceGeneratorComponent,
      resolve: {
        clients: InvoiceBuyersResolver,
        seller: InvoiceSellerResolver
      }
    },
    {
      path: 'invoice/:id',
      component: InvoiceComponent,
      resolve: {
        invoice: InvoiceResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InvoiceRoutingModule {}
