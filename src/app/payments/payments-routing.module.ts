import { PaymentsListComponent } from './payments-list/payments-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shell } from '@app/shell/shell.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'payments',
      component: PaymentsListComponent,
      data: {
        title: 'Payments'
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
