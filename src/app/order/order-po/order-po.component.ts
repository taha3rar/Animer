import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService, OrderService } from '@app/core';
import { saveAs as importedSaveAs } from 'file-saver';
import { DocumentDownloadComponent } from '@app/shared/components/document-download/document-download.component';

@Component({
  selector: 'app-order-po',
  templateUrl: './order-po.component.html',
  styleUrls: ['./order-po.component.scss']
})
export class OrderPoComponent extends DocumentDownloadComponent implements OnInit {
  user_id: string;
  buyer: boolean;
  @Input()
  order: Order;
  @Input()
  generateOrder: boolean;

  constructor(private authService: AuthenticationService, private orderService: OrderService) {
    super(orderService, 'purchase-order', 'Purchase Order');
  }

  ngOnInit() {
    this.buyer = false;
    this.user_id = this.authService.currentUserId;
    if (this.order && this.user_id === this.order.buyer._id) {
      this.buyer = true;
    }
    super.setTransaction(this.order);
  }

  sellerContactSms(): boolean {
    if (this.order) {
      return this.order.seller.contact_by.includes('sms');
    } else {
      return false;
    }
  }

  sellerContactEmail(): boolean {
    if (this.order) {
      return this.order.seller.contact_by.includes('email');
    } else {
      return false;
    }
  }
}
