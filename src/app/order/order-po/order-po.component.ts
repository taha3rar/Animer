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
    super();
  }

  ngOnInit() {
    this.buyer = false;
    this.user_id = this.authService.currentUserId;
    if (this.order && this.user_id === this.order.buyer._id) {
      this.buyer = true;
    }
    this.transaction = this.order;
    this.transactionRoute = 'purchase-order';
    this.service = this.orderService;
    this.documentName = 'Proforma Invoice';
  }
}
