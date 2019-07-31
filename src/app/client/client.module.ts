import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientListComponent } from './client-list/client-list.component';
import { CurrentUserClientsResolver } from '@app/shared/resolvers/current-user-clients.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientGeneratorComponent } from './client-generator/client-generator.component';
import { ClientComponent } from './client/client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientInvoicesComponent } from './client-invoices/client-invoices.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { SharedModule } from '@app/shared';
import { CurrentUserEcosystemsResolver } from '@app/shared/resolvers/current-user-ecosystems.resolver';
import { ClientResolver } from './resolvers/client.resolver';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { UserDocumentListResolver } from './resolvers/document-list.resolver';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    TranslateModule,
    NgbModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TutorialsModule,
    NgxPermissionsModule.forRoot(),
    MatSortModule
  ],
  declarations: [
    ClientListComponent,
    ClientGeneratorComponent,
    ClientComponent,
    ClientProfileComponent,
    ClientOrdersComponent,
    ClientInvoicesComponent,
    ClientDocumentsComponent
  ],
  providers: [
    CurrentUserClientsResolver,
    ClientResolver,
    CurrentUserResolver,
    CurrentUserEcosystemsResolver,
    OrderListResolver,
    InvoiceListResolver,
    UserDocumentListResolver
  ]
})
export class ClientModule {}
