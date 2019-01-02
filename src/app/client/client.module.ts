import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListResolver } from './resolvers/client-list.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientGeneratorComponent } from './client-generator/client-generator.component';
import { ClientComponent } from './client/client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientTransactionsComponent } from './client-transactions/client-transactions.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientInvoicesComponent } from './client-invoices/client-invoices.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, ClientRoutingModule, TranslateModule, NgbModule, SharedModule, NgxPaginationModule],
  // tslint:disable-next-line:max-line-length
  declarations: [
    ClientListComponent,
    ClientGeneratorComponent,
    ClientComponent,
    ClientProfileComponent,
    ClientTransactionsComponent,
    ClientOrdersComponent,
    ClientInvoicesComponent,
    ClientDocumentsComponent
  ],
  providers: [ClientListResolver]
})
export class ClientModule {}
