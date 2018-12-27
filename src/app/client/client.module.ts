import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListResolver } from './resolvers/client-list.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientGeneratorComponent } from './client-generator/client-generator.component';

@NgModule({
  imports: [CommonModule, ClientRoutingModule, TranslateModule, NgbModule, NgxPaginationModule],
  declarations: [ClientListComponent, ClientGeneratorComponent],
  providers: [ClientListResolver]
})
export class ClientModule {}
