import { SharedModule } from '@app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NotificationListResolver } from './resolvers/notification-list.resolver';
import { NotificationListComponent } from './header/notification-list/notification-list.component';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { CurrentUserProgressResolver } from '@app/shared/resolvers/current-user-progress.resolver';

@NgModule({
<<<<<<< HEAD
  imports: [CommonModule, SharedModule, TranslateModule, NgbModule, RouterModule, NgxPermissionsModule.forRoot()],
=======
  imports: [CommonModule, TranslateModule, NgbModule, RouterModule, MatTooltipModule, NgxPermissionsModule.forRoot()],
>>>>>>> Few tooltips
  declarations: [HeaderComponent, ShellComponent, MenuComponent, NotificationListComponent],
  providers: [NotificationListResolver, CurrentUserResolver, CurrentUserProgressResolver]
})
export class ShellModule {}
