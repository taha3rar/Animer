import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRouting } from './notifications-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationListResolver } from './resolvers/notification-list.resolver';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [CommonModule, NotificationsRouting, NgxPaginationModule, NgbModule, MatTooltipModule],
  providers: [NotificationListResolver]
})
export class NotificationsModule {}
