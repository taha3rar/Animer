import { DpoAccountResolver } from './resolvers/dpo-account.resolver';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { ContactPaymentComponent } from './contact-payment/contact-payment.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shell } from '@app/shell/shell.service';
import { Routes, RouterModule } from '@angular/router';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';
import { DocumentPaymentComponent } from './document-payment/document-payment.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';
import { DpoWalletResolver } from './resolvers/dpo-wallet.resolver';
import { DpoTransactionResolver } from './resolvers/dpo-transaction.resolver';
import { TransactionViewResolver } from './resolvers/transaction-view.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'payments',
      component: PaymentsListComponent,
      resolve: {
        account: DpoAccountResolver,
        wallet: DpoWalletResolver,
        transactions: DpoTransactionResolver
      },
      data: {
        title: 'Payments'
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'payments/account',
      component: PaymentSettingsComponent,
      resolve: { account: DpoAccountResolver }
    },
    {
      path: 'payments/generator/contact',
      component: ContactPaymentComponent,
      resolve: {
        contacts: CurrentUserContactsResolver,
        wallet: DpoWalletResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'payments/generator/document',
      component: DocumentPaymentComponent,
      resolve: {
        contacts: CurrentUserContactsResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'payments/payment/:id',
      component: PaymentViewComponent,
      resolve: { transaction: TransactionViewResolver }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
