import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemRoutingModule } from './ecosystem-routing.module';
import { EcosystemComponent } from './ecosystem.component';

@NgModule({
  declarations: [EcosystemsListComponent, EcosystemComponent],
  imports: [CommonModule, EcosystemRoutingModule]
})
export class EcosystemModule {}
