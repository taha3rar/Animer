import { Component, OnInit, Input } from '@angular/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuotationService } from '@app/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductQuotation } from '@app/core/models/quotation/product-quotation';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuotationComponent } from '../../quotation/quotation.component';

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

  constructor(
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.ngOnInit();
    //   }
    // });
  }

  ngOnInit() {
    this.route.data.subscribe(({ quoteRequest, quotations, acceptedQuotations }) => {
      this.quoteRequest = quoteRequest;
      this.acceptedQuotations ? (this.quotations = acceptedQuotations) : (this.quotations = quotations);
      console.log(this.quotations);
    });
  }

  openQuotationView(quotation: Quotation): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = { quotation: quotation };

    const dialogRef = this.dialog.open(QuotationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.refresh) {
        // this.router.navigate([this.router.url])
      }
    });
  }
}
