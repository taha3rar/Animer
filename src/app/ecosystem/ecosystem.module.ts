import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemRoutingModule } from './ecosystem-routing.module';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { EcosystemListResolver } from './resolvers/ecosystem-list.resolver';
import { UserClientResolver } from './resolvers/user-client.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EcosystemAddClientComponent } from './ecosystem-add-client/ecosystem-add-client.component';
import { EcosystemGeneratorComponent } from './ecosystem-generator/ecosystem-generator.component';

@NgModule({
  declarations: [EcosystemsListComponent, EcosystemComponent, EcosystemGeneratorComponent, EcosystemAddClientComponent],
  imports: [CommonModule, EcosystemRoutingModule, NgxPaginationModule, NgbModule, FormsModule, ReactiveFormsModule],
  providers: [EcosystemListResolver, UserClientResolver, UserResolver]
})
export class EcosystemModule {}
