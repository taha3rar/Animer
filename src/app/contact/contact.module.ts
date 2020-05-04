import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { CurrentUserClientsResolver } from '@app/shared/resolvers/current-user-clients.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { ContactDocumentsComponent } from './contact-documents/contact-documents.component';
import { SharedModule } from '@app/shared';
import { ContactResolver } from './resolvers/contact.resolver';
import { UserDocumentListResolver } from './resolvers/document-list.resolver';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { MatSortModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
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
  declarations: [ContactListComponent, ContactComponent, ContactProfileComponent, ContactDocumentsComponent],
  providers: [CurrentUserClientsResolver, ContactResolver, CurrentUserResolver, UserDocumentListResolver]
})
export class ContactModule {}
