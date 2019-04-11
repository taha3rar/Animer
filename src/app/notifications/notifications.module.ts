import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRouting } from './notifications-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationsComponent } from './notifications.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NotificationListComponent, NotificationsComponent],
  imports: [CommonModule, NotificationsRouting, NgxPaginationModule, NgbModule, MatTooltipModule]
})
export class NotificationsModule {}
