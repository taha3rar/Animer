import { QrProcessedProductComponent } from './qr-processed-product/qr-processed-product.component';
import { QrAgriculturalProductComponent } from './qr-agricultural-product/qr-agricultural-product.component';
import { Component, OnInit, Input } from '@angular/core';
import { currencies } from '@app/shared/helpers/currencies';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/core/models/user/user';
import { FormGroup } from '@angular/forms';
import { QuoteRequestDataService } from '../quote-request-data.service';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { ProductQuoteRequest } from '@app/core/models/quote-request/product-quoteRequest';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { SellerQuoteRequest } from '@app/core/models/quote-request/seller-quoteRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-request-generator-form',
  templateUrl: './quote-request-generator-form.component.html',
  styleUrls: ['./quote-request-generator-form.component.scss']
})
export class QuoteRequestGeneratorFormComponent extends BaseValidationComponent implements OnInit {
  @Input() quoteRequestForm: FormGroup;
  currencies = currencies;
  buyer: User;
  targeted_sellers: SellerQuoteRequest[];
  products: ProductQuoteRequest[] = [];
  quoteRequest: QuoteRequest;
  page = 1;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private quoteRequestDataService: QuoteRequestDataService
  ) {
    super();
  }

  ngOnInit() {
    this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
      this.targeted_sellers = quoteRequest.sellers;
    });
    this.buyer = this.route.snapshot.data['buyer'];
    this.formInput = this.quoteRequestForm;
  }

  openUpdateDialog(index: number) {
    this.products[index].product_type === 'agricultural'
      ? this.openDialogAgricultural(index)
      : this.openDialogProcessed(index);
  }

  openDialogAgricultural(index?: number): void {
    const data = {
      index: index,
      product: this.products[index]
    };

    this.openDialog('720px', QrAgriculturalProductComponent, data);
  }

  openDialogProcessed(index?: number): void {
    const data = {
      index: index,
      product: this.products[index]
    };

    this.openDialog('765px', QrProcessedProductComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = height;
    dialogConfig.width = '850px';
    dialogConfig.data = dialogData;

    const dialogRef = this.dialog.open(component, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        data.index >= 0 ? this.updateProduct(data.product, data.index) : this.addProduct(data.product);
      }
    });
  }

  addProduct(product: ProductQuoteRequest) {
    this.products.push(product);
  }

  updateProduct(product: ProductQuoteRequest, index: number) {
    this.products[index] = product;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  uploadQuoteRequest() {
    this.quoteRequest.products = this.products;
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
  }

  toReview() {
    this.quoteRequest = this.quoteRequestForm.value;
    this.quoteRequest.buyer.contact_by = this.quoteRequestForm.value.buyer.contact_by.value;
    this.quoteRequest.products = this.products;
    this.quoteRequest.sellers = this.targeted_sellers;
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
  }
}
