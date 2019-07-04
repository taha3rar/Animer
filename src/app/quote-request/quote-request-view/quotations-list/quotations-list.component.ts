import { Component, Input, OnInit } from '@angular/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { ProductQuotation } from '@app/core/models/quotation/product-quotation';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuotationComponent } from '../../quotation/quotation.component';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-quotations-list',
  templateUrl: './quotations-list.component.html',
  styleUrls: ['./quotations-list.component.scss']
})
export class QuotationsListComponent extends BaseListComponent {
  @Input() quotations: Quotation[];
  @Input() paginationId = 'p1';
  page = 1;
  quoteRequest: QuoteRequest;
  viewProduct: ProductQuotation;

  constructor(public dialog: MatDialog) {
    super();
  }

  sortData(sort: Sort) {
    const data = this.quotations.slice();
    if (!sort.active || sort.direction === '') {
      this.quotations = data;
      return;
    }

    this.quotations = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'company':
          return super.compare(a.seller.company_name, b.seller.company_name, isAsc);
        case 'contact':
          return super.compare(
            a.seller.first_name + a.seller.last_name,
            b.seller.first_name + b.seller.last_name,
            isAsc
          );
        case 'status':
          return super.compare(a.status, b.status, isAsc);
        case 'offer':
          return super.compare(
            a.product.product_type !== 'agricultural' ? a.product.quantity_offered : a.product.total_weight_offered,
            b.product.product_type !== 'agricultural' ? b.product.quantity_offered : b.product.total_weight_offered,
            isAsc
          );
        case 'rate':
          return super.compare(
            a.product.product_type !== 'agricultural' ? a.product.package_price : a.product.price_per_unit,
            b.product.product_type !== 'agricultural' ? b.product.package_price : b.product.price_per_unit,
            isAsc
          );
        case 'price':
          return super.compare(a.product.product_subtotal, b.product.product_subtotal, isAsc);
        default:
          return 0;
      }
    });
  }

  openQuotationView(quotation: Quotation): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = { quotation: quotation };
    this.dialog.open(QuotationComponent, dialogConfig);
  }
}
