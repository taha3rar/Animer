import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemRoutingModule } from './ecosystem-routing.module';
import { EcosystemComponent } from './ecosystem.component';
import { EcosystemListResolver } from './resolvers/ecosystem-list.resolver';

@NgModule({
  declarations: [EcosystemsListComponent, EcosystemComponent],
  imports: [CommonModule, EcosystemRoutingModule],
  providers: [EcosystemListResolver]
})
export class EcosystemModule {}
