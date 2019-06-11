import { Component, OnInit, Input } from '@angular/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuotationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { ProductQuotation } from '@app/core/models/quotation/product-quotation';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-quotations-list',
  templateUrl: './quotations-list.component.html',
  styleUrls: ['./quotations-list.component.scss']
})
export class QuotationsListComponent implements OnInit {
  @Input() acceptedQuotations = false;
  page = 1;
  quoteRequest: QuoteRequest;
  quotations: Quotation[];
  viewProduct: ProductQuotation;

  constructor(private quotationService: QuotationService, private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quotationService.getByQuoteRequest(this.quoteRequest._id).subscribe(quotations => {
      if (this.acceptedQuotations) {
        this.quotations = quotations.filter(quotation => quotation.status === 'QUOTATION ACCEPTED');
      } else {
        this.quotations = quotations;
      }
      console.log(this.quotations);
    });
  }

  // openQuotationView(index: number): void {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.autoFocus = true;
  //   // dialogConfig.height = height;
  //   // dialogConfig.width = '850px';
  //   dialogConfig.data = {quotation : this.quotations[index]};

  //   const dialogRef = this.dialog.open(component, dialogConfig);
  //   // dialogRef.afterClosed().subscribe(data => {
  //   //   if (data) {
  //   //     this.updateProduct(data.product, data.index);
  //   //   }
  //   // });
  // }
}
