import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListResolver } from './resolvers/client-list.resolver';

@NgModule({
  imports: [CommonModule, ClientRoutingModule, TranslateModule],
  declarations: [ClientListComponent],
  providers: [ClientListResolver]
})
export class ClientModule {}
