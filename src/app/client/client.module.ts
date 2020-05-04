import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientListComponent } from './client-list/client-list.component';
import { CurrentUserClientsResolver } from '@app/shared/resolvers/current-user-clients.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from './client/client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { SharedModule } from '@app/shared';
import { ClientResolver } from './resolvers/client.resolver';
import { UserDocumentListResolver } from './resolvers/document-list.resolver';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { MatSortModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatSortModule,
    MatTooltipModule
  ],
  declarations: [ClientListComponent, ClientComponent, ClientProfileComponent, ClientDocumentsComponent],
  providers: [CurrentUserClientsResolver, ClientResolver, CurrentUserResolver, UserDocumentListResolver]
})
export class ClientModule {}
