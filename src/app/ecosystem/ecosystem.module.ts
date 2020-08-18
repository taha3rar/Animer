import { EcosystemListComponent } from './ecosystem-list/ecosystem-list.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { MatSortModule, MatTabsModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EcosystemRoutingModule } from './ecosystem-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EcosystemRoutingModule,
    TranslateModule,
    NgbModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    TutorialsModule,
    NgxPermissionsModule.forRoot(),
    MatSortModule,
    MatTooltipModule
  ],
  declarations: [
    EcosystemComponent,
    EcosystemListComponent
  ],
})
export class EcosystemModule { }
