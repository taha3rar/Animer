import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NotificationListResolver } from './resolvers/notification-list.resolver';
import { NotificationListComponent } from './header/notification-list/notification-list.component';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, RouterModule, NgxPermissionsModule.forRoot()],
  declarations: [HeaderComponent, ShellComponent, MenuComponent, NotificationListComponent],
  providers: [NotificationListResolver]
})
export class ShellModule {}
