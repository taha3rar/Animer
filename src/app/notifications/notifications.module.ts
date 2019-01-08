import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRouting } from './notifications-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [CommonModule, NotificationsRouting, NgxPaginationModule]
})
export class NotificationsModule {}
