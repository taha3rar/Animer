import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemRoutingModule } from './ecosystem-routing.module';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { CurrentUserEcosystemsResolver } from '@app/shared/resolvers/current-user-ecosystems.resolver';
import { CurrentUserClientsResolver } from '@app/shared/resolvers/current-user-clients.resolver';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EcosystemAddClientComponent } from './ecosystem-add-client/ecosystem-add-client.component';
import { EcosystemGeneratorComponent } from './ecosystem-generator/ecosystem-generator.component';
import { EcosystemResolver } from './resolvers/ecosystem.resolver';

@NgModule({
  declarations: [EcosystemsListComponent, EcosystemComponent, EcosystemGeneratorComponent, EcosystemAddClientComponent],
  imports: [
    CommonModule,
    EcosystemRoutingModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TutorialsModule
  ],
  providers: [CurrentUserEcosystemsResolver, CurrentUserClientsResolver, CurrentUserResolver, EcosystemResolver]
})
export class EcosystemModule {}
