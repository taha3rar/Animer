import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService } from '@app/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CsvService } from '@app/shared/services/csv.service';
import { RoundUpPipe } from '@app/shared/pipes/roundup.pipe';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[];
  allOrders: Order[];
  buyerOrders: Order[];
  sellerOrders: Order[];
  page = 1;
  viewAsSeller = false;
  viewAsBuyer = false;
  viewAsAgri = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private roundUpPipe: RoundUpPipe,
    private csvService: CsvService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ orders, ordersAsBuyer, ordersAsSeller }) => {
      this.orders = orders;
      this.allOrders = orders;
      this.buyerOrders = ordersAsBuyer;
      this.sellerOrders = ordersAsSeller;
    });
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    this.viewAsAgri = false;
    if (profileType === 'seller') {
      this.orders = this.sellerOrders;
      this.viewAsSeller = true;
    } else if (profileType === 'buyer') {
      this.orders = this.buyerOrders;
      this.viewAsBuyer = true;
    } else {
      this.orders = this.allOrders;
      this.viewAsAgri = true;
    }
  }

  exportAll() {
    // TODO: Find a better way to do this, should be done in the shared component because the stuff to show is decided there

    const headers = {
      id: 'ID',
      date: 'Date',
      company: 'Company',
      contact: 'Contact',
      packages: 'Packages',
      price: 'Price',
      status: 'Status'
    };

    const orders = this.orders.map((order: Order) => {
      const company =
        this.authService.currentUserId === order.seller._id ? order.buyer.company_name : order.seller.company_name;

      const contact =
        this.authService.currentUserId === order.seller._id
          ? `${order.buyer.first_name} ${order.buyer.last_name}`
          : `${order.seller.first_name} ${order.seller.last_name}`;

      const packages = order.total_weight
        ? `${this.roundUpPipe.transform(order.total_weight)} ${order.document_weight_unit || ''}`
        : 'N/A';

      const price = order.total_due
        ? `${this.decimalPipe.transform(order.total_due, '1.2-2')} ${order.currency}`
        : 'N/A';

      return {
        id: order.numericId,
        date: this.datePipe.transform(order.date_created, 'dd/MM/yyyy'),
        company: company,
        contact: contact,
        packages: packages,
        price: price,
        status: order.status
      };
    });

    this.csvService.generateAndDownload(orders, headers, 'purchase_orders');
  }
}
