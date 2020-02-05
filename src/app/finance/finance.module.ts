import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './finance-routing.module';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { LoanGeneratorComponent } from './loan-generator/loan-generator.component';

@NgModule({
  declarations: [FinanceListComponent, LoanGeneratorComponent],
  entryComponents: [],

  imports: [CommonModule, ProductRoutingModule],
  providers: []
})
export class FinanceModule {}
