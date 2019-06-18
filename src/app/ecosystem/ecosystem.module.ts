import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemRoutingModule } from './ecosystem-routing.module';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { UserEcosystemsResolver } from '@app/shared/resolvers/user-ecosystems.resolver';
import { UserClientsResolver } from '@app/shared/resolvers/user-clients.resolver';
import { UserResolver } from '../shared/resolvers/user.resolver';
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
  providers: [UserEcosystemsResolver, UserClientsResolver, UserResolver, EcosystemResolver]
})
export class EcosystemModule {}
