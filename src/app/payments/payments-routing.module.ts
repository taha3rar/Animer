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

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'payments',
      component: PaymentsListComponent,
      resolve: { account: DpoAccountResolver },
      data: {
        title: 'Payments'
      }
    },
    {
      path: 'payments/generator/contact',
      component: ContactPaymentComponent,
      resolve: {
        contacts: CurrentUserContactsResolver
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
      component: PaymentViewComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
