import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService, OrderService } from '@app/core';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-order-po',
  templateUrl: './order-po.component.html',
  styleUrls: ['./order-po.component.scss']
})
export class OrderPoComponent implements OnInit {
  user_id: string;
  buyer: boolean;
  @Input()
  order: Order;
  @Input()
  generateOrder: boolean;

  constructor(private authService: AuthenticationService, private orderService: OrderService) {}

  ngOnInit() {
    this.buyer = false;
    this.user_id = this.authService.currentUserId;
    if (this.order && this.user_id === this.order.buyer._id) {
      this.buyer = true;
    }
  }

  download(version: string): void {
    this.orderService.getPdf(this.order._id, version).subscribe(data => {
      const blob = new Blob([data], { type: 'application/pdf' });
      importedSaveAs(blob, `purchase-order-${this.order.numericId}-${version}`);
      swal.close();
    });
  }

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of purchase order document you would like to download:',
      buttons: {
        originalDoc: { text: 'Original Document', value: 'original', className: 'swal-button-o', closeModal: false },
        copyDoc: { text: 'Copy Document', value: 'copy', closeModal: false }
      }
    }).then(value => {
      if (value === 'original') {
        this.download('original');
      } else {
        this.download('copy');
      }
    });
  }
}
