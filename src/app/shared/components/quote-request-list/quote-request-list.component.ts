import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { AuthenticationService, QuoteRequestService } from '@app/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { BaseListComponent } from '../base-list/base-list.component';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-quote-request-list',
  templateUrl: './quote-request-list.component.html',
  styleUrls: ['./quote-request-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuoteRequestListComponent extends BaseListComponent implements OnInit {
  @Input() quoteRequests: QuoteRequest[];
  @Input() searchTerm: string;
  isBuyer: Boolean;
  userId: String;
  qrReceived = 'QUOTE REQUEST RECEIVED';
  qrSent = 'QUOTE REQUEST SENT';
  qSent = 'QUOTATION SENT';
  qReceived = 'QUOTATION RECEIVED';
  qAccepted = 'QUOTATION ACCEPTED';
  oReceived = 'ORDER RECEIVED';
  qAcceptedInfo = 'Please notice that an accepted Quotation is not a finalized order, please wait for a purchase order';

  constructor(
    protected authService: AuthenticationService,
    private quoteRequestService: QuoteRequestService,
    protected router: Router
  ) {
    super(quoteRequestService, router, {
      deleteText: 'Once deleted, you will not be able to recover this Quote Request!',
      pageName: 'quotes-requests'
    });
  }

  ngOnInit() {
    this.authService.isSeller ? (this.isBuyer = false) : (this.isBuyer = true);
    this.userId = this.authService.currentUserId;
  }

  sortData(sort: Sort) {
    const data = this.quoteRequests.slice();
    if (!sort.active || sort.direction === '') {
      this.quoteRequests = data;
      return;
    }

    this.quoteRequests = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'date':
          return super.compare(a.date_created, b.date_created, isAsc);
        case 'contact':
          return super.compare(a.buyer.first_name + a.buyer.last_name, b.buyer.first_name + b.buyer.last_name, isAsc);
        case 'product':
          if (a.product && b.product) {
            return super.compare(a.product.produce, b.product.produce, isAsc);
          } else if (a.product && !b.product) {
            return super.compare(a.product.produce, undefined, isAsc);
          } else if (!a.product && b.product) {
            return super.compare(undefined, b.product.produce, isAsc);
          } else {
            return -1;
          }
        case 'amount':
          if (a.product && b.product) {
            return super.compare(
              a.product.product_type !== 'agricultural'
                ? a.product.quantity_requested
                : a.product.total_weight_requested,
              b.product.product_type !== 'agricultural'
                ? b.product.quantity_requested
                : b.product.total_weight_requested,
              isAsc
            );
          } else if (a.product && !b.product) {
            return super.compare(
              a.product.product_type !== 'agricultural'
                ? a.product.quantity_requested
                : a.product.total_weight_requested,
              undefined,
              isAsc
            );
          } else if (!a.product && b.product) {
            return super.compare(
              undefined,
              b.product.product_type !== 'agricultural'
                ? b.product.quantity_requested
                : b.product.total_weight_requested,
              isAsc
            );
          } else {
            return -1;
          }
        case 'participants':
          return super.compare(a.sellers.length, b.sellers.length, isAsc);
        case 'quotations':
          return super.compare(a.quotations.count, b.quotations.count, isAsc);
        case 'status':
          return super.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  quotationSent(quoteRequest: QuoteRequest) {
    const qStatus = quoteRequest.status;
    return (
      qStatus === this.qSent || qStatus === this.qReceived || qStatus === this.qAccepted || qStatus === this.oReceived
    );
  }

  participants(index: number): string {
    let list = '';

    this.quoteRequests[index].sellers.forEach((seller: any) => {
      list += '• ' + seller.first_name + ' ' + seller.last_name + '\n';
    });

    return list;
  }
}
