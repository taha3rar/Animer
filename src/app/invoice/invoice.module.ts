import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';

@NgModule({
  declarations: [InvoicesListComponent],
  imports: [CommonModule, TranslateModule, InvoiceRoutingModule],
  providers: [InvoiceListResolver]
})
export class InvoiceModule {}
