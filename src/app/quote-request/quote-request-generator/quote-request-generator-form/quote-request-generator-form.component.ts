import { QrInputProductComponent } from './qr-input-product/qr-input-product.component';
import { QrProcessedProductComponent } from './qr-processed-product/qr-processed-product.component';
import { QrAgriculturalProductComponent } from './qr-agricultural-product/qr-agricultural-product.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { currencies } from '@app/shared/helpers/currencies';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/core/models/user/user';
import { FormGroup } from '@angular/forms';
import { QuoteRequestDataService } from '../quote-request-data.service';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { ProductQuoteRequest } from '@app/core/models/quote-request/product-quoteRequest';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { SellerQuoteRequest } from '@app/core/models/quote-request/seller-quoteRequest';
import { QuoteRequestService } from '@app/core';
import { AlertsService } from '@app/core/alerts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-request-generator-form',
  templateUrl: './quote-request-generator-form.component.html',
  styleUrls: ['./quote-request-generator-form.component.scss']
})
export class QuoteRequestGeneratorFormComponent extends BaseValidationComponent implements OnInit {
  @Input() quoteRequestForm: FormGroup;
  @Output() validQuoteRequest = new EventEmitter<Boolean>();
  currencies = currencies;
  buyer: User;
  targeted_sellers: SellerQuoteRequest[];
  product: ProductQuoteRequest;
  quoteRequest: QuoteRequest;
  page = 1;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private quoteRequestDataService: QuoteRequestDataService,
    private quoteRequestService: QuoteRequestService,
    private alerts: AlertsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
      this.quoteRequest = quoteRequest;
      this.targeted_sellers = this.quoteRequest.sellers;
      this.quoteRequest.product ? (this.product = this.quoteRequest.product) : (this.product = undefined);
    });
    this.buyer = this.route.snapshot.data['buyer'];
    this.formInput = this.quoteRequestForm;
    this.onChanges();
  }

  onChanges() {
    this.quoteRequestForm.get('valid_by').valueChanges.subscribe(valid_by => {
      this.quoteRequest.valid_by = moment(valid_by)
        .subtract(1, 'months')
        .toJSON();
      this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
    });
    this.quoteRequestForm.get('currency').valueChanges.subscribe(currency => {
      this.quoteRequest.currency = currency;
      this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
    });
    this.quoteRequestForm.get('buyer_comments').valueChanges.subscribe(buyer_comments => {
      this.quoteRequest.buyer_comments = buyer_comments;
      this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
    });
  }

  openUpdateDialog() {
    if (this.product.product_type === 'agricultural') {
      this.openDialogAgricultural();
    } else if (this.product.product_type === 'processed') {
      this.openDialogProcessed();
    } else {
      this.openDialogInput();
    }
  }

  openDialogAgricultural(): void {
    const data = {
      product: this.product
    };

    this.openDialog('92vh', QrAgriculturalProductComponent, data);
  }

  openDialogProcessed(): void {
    const data = {
      product: this.product
    };

    this.openDialog('92vh', QrProcessedProductComponent, data);
  }

  openDialogInput(): void {
    const data = {
      product: this.product
    };

    this.openDialog('92vh', QrInputProductComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = height;
    dialogConfig.width = '850px';
    dialogConfig.data = dialogData;
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(component, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.updateProduct(data.product, data.index);
      }
    });
  }

  updateProduct(product: ProductQuoteRequest, index: number) {
    this.product = product;
    this.pushProducts();
  }

  deleteProduct() {
    this.product = undefined;
    this.pushProducts();
  }

  pushProducts() {
    this.quoteRequest.product = this.product;
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
  }

  draftQuoterequest() {
    this.disableSubmitButton(true);
    this.validQuoteRequest.emit(true);
    this.quoteRequestService.draft(this.quoteRequest).subscribe(
      quoteRequest => {
        this.alerts.showAlert('Your quote request has been saved');
        this.router.navigateByUrl('/quote-request');
      },
      err => {
        this.disableSubmitButton(false);
      }
    );
  }
}
