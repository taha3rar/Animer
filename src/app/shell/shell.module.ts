import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent, MenuComponent]
})
export class ShellModule {}
