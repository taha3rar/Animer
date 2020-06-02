import { ContactPaymentComponent } from './contact-payment/contact-payment.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shell } from '@app/shell/shell.service';
import { Routes, RouterModule } from '@angular/router';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'payments',
      component: PaymentsListComponent,
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
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
