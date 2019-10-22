import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService } from '@app/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CsvService } from '@app/shared/services/csv.service';
import { RoundUpPipe } from '@app/shared/pipes/roundup.pipe';
import { OrderDataService } from '../order-generator/order-data.service';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

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
  searchTerm: string;
  page = 1;
  agribusinessUser: boolean;
  viewAsSeller = false;
  viewAsBuyer = true;
  currentUser: any;
  tooltips = tooltips.orders.orders_list;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private roundUpPipe: RoundUpPipe,
    private csvService: CsvService
  ) {}

  ngOnInit() {
    this.agribusinessUser = this.authService.isAgribusiness;
    this.route.data.subscribe(({ orders, ordersAsBuyer, ordersAsSeller, currentUser }) => {
      this.buyerOrders = ordersAsBuyer;
      this.sellerOrders = ordersAsSeller;
      this.currentUser = currentUser;
      if (this.agribusinessUser) {
        this.orders = ordersAsBuyer;
      } else {
        this.orders = orders;
      }
    });
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    if (profileType === 'seller') {
      this.orders = this.sellerOrders;
      this.viewAsSeller = true;
    } else {
      this.orders = this.buyerOrders;
      this.viewAsBuyer = true;
    }
  }

  get helpLegend() {
    if (this.authService.isAgribusiness) {
      // tslint:disable-next-line:max-line-length
      return 'Create and distribute purchase orders to your sellers, review their proforma invoices, receive purchase orders from your buyers, reply to them with customized proforma invoices, upload your own necessary documents, and manage the entire trade process in one place.';
    } else if (this.authService.isBuyer) {
      // tslint:disable-next-line:max-line-length
      return 'Create and distribute purchase orders to your sellers, review their proforma invoices, upload your own necessary documents, and manage the entire trade process in one place.';
    } else if (this.authService.isSeller) {
      // tslint:disable-next-line:max-line-length
      return 'Receive purchase orders from your buyers, reply to them with customized proforma invoices, upload your own necessary documents, and manage the entire trade process in one place.';
    }

    return '';
  }

  exportAll() {
    // TODO: Find a better way to do this, should be done in the shared component because the stuff to show is decided there

    const headers = {
      id: 'ID',
      date: 'Date',
      company: 'Company',
      contact: 'Contact',
      amount: 'Amount',
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

      const amount = order.total_weight
        ? order.document_weight_unit
          ? `${this.decimalPipe.transform(order.total_weight, '1.2-2')} ${order.document_weight_unit || ''}`
          : 'N/A'
        : 'N/A';

      const price = order.total_due
        ? `${this.decimalPipe.transform(order.total_due, '1.2-2')} ${order.currency}`
        : 'N/A';

      return {
        id: order.numericId,
        date: this.datePipe.transform(order.date_created, 'dd/MM/yyyy'),
        company: company,
        contact: contact,
        amount: amount,
        price: price,
        status: order.status
      };
    });

    this.csvService.generateAndDownload(orders, headers, 'purchase_orders');
  }
}
