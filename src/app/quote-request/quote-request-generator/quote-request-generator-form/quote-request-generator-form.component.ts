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
  products: ProductQuoteRequest[];
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
      this.quoteRequest.products ? (this.products = this.quoteRequest.products) : (this.products = []);
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
    this.pushProducts();
  }

  updateProduct(product: ProductQuoteRequest, index: number) {
    this.products[index] = product;
    this.pushProducts();
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.pushProducts();
  }

  pushProducts() {
    this.quoteRequest.products = this.products;
    this.measurementUnitConflict(this.products);
    this.quoteRequestDataService.setQuoteRequest(this.quoteRequest);
  }

  measurementUnitConflict(products: ProductQuoteRequest[]): String {
    let baseMeasurementUnit: String;
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_type === 'agricultural') {
        if (!baseMeasurementUnit) {
          baseMeasurementUnit = products[i].weight_unit;
        } else {
          if (baseMeasurementUnit !== products[i].weight_unit) {
            return undefined;
          }
        }
      }
    }
    return baseMeasurementUnit;
  }

  draftQuoterequest() {
    this.validQuoteRequest.emit(true);
    this.quoteRequestService.draft(this.quoteRequest).subscribe(quoteRequest => {
      this.alerts.showAlert('Your quote request has been saved');
      this.router.navigateByUrl('/quote-request/list');
    });
  }
}
