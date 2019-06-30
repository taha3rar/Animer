import { Component, Input } from '@angular/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { ProductQuotation } from '@app/core/models/quotation/product-quotation';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuotationComponent } from '../../quotation/quotation.component';

@Component({
  selector: 'app-quotations-list',
  templateUrl: './quotations-list.component.html',
  styleUrls: ['./quotations-list.component.scss']
})
export class QuotationsListComponent {
  @Input() quotations: Quotation[];
  @Input() paginationId = 'p1';
  page = 1;
  quoteRequest: QuoteRequest;
  viewProduct: ProductQuotation;

  constructor(public dialog: MatDialog) {}

  openQuotationView(quotation: Quotation): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = { quotation: quotation };
    this.dialog.open(QuotationComponent, dialogConfig);
  }
}
