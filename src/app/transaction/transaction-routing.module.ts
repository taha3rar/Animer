import { PurchaseOrderResolver } from './resolvers/purchase-order.resolver';
import { BuyerResolver } from './resolvers/buyer.resolver';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProformaInvoiceResolver } from './resolvers/proforma-invoice.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'transaction/list',
      component: TransactionListComponent,
      resolve: { transactions: TransactionListResolver },
      data: { title: extract('Transactions') }
    },
    {
      path: 'transaction/:id',
      component: TransactionComponent,
      resolve: {
        quoteRequest: QuoteRequestResolver,
        proformaInvoice: ProformaInvoiceResolver,
        purchaseOrder: PurchaseOrderResolver,
        buyer: BuyerResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransactionRoutingModule {}
