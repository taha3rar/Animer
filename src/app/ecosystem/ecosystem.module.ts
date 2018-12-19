import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemRoutingModule } from './ecosystem-routing.module';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { EcosystemListResolver } from './resolvers/ecosystem-list.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EcosystemsListComponent, EcosystemComponent],
  imports: [CommonModule, EcosystemRoutingModule, NgxPaginationModule, NgbModule],
  providers: [EcosystemListResolver]
})
export class EcosystemModule {}
