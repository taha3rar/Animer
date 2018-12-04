import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './clients-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientGeneratorComponent } from './client-generator/client-generator.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListResolver } from './resolvers/client-list.resolver';

@NgModule({
  imports: [CommonModule, ClientRoutingModule, TranslateModule],
  declarations: [ClientListComponent, ClientGeneratorComponent],
  providers: [ClientListResolver]
})
export class ClientsModule {}
