import { LoanComponent } from './loan/loan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { LoanGeneratorComponent } from './loan-generator/loan-generator.component';
import { FinanceListResolver } from './resolvers/finance-list.resolver';
import { LoanResolver } from './resolvers/loan.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'finance',
      component: FinanceListComponent,
      resolve: {
        financeList: FinanceListResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'finance/generator/loan',
      component: LoanGeneratorComponent
    },
    {
      path: 'finance/generator/loan/:id',
      component: LoanGeneratorComponent,
      resolve: {
        loan: LoanResolver
      }
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
