import { LoanComponent } from './loan/loan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { LoanGeneratorComponent } from './loan-generator/loan-generator.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'finance',
      component: FinanceListComponent,
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'finance/generator/loan',
      component: LoanGeneratorComponent
    },
    {
      path: 'finance/loan/:id',
      component: LoanComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule {}
