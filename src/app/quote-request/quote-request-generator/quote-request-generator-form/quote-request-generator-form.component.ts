import { QrProcessedProductComponent } from './qr-processed-product/qr-processed-product.component';
import { QrAgriculturalProductComponent } from './qr-agricultural-product/qr-agricultural-product.component';
import { Component, OnInit, Input } from '@angular/core';
import { currencies } from '@app/shared/helpers/currencies';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/core/models/user/user';
import { FormGroup } from '@angular/forms';
import { QuoteRequestDataService } from '../quote-request-data.service';

@Component({
  selector: 'app-quote-request-generator-form',
  templateUrl: './quote-request-generator-form.component.html',
  styleUrls: ['./quote-request-generator-form.component.scss']
})
export class QuoteRequestGeneratorFormComponent implements OnInit {
  @Input() quoteRequestForm: FormGroup;
  currencies = currencies;
  buyer: User;
  targeted_sellers: any[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private quoteRequestDataService: QuoteRequestDataService
  ) {}

  ngOnInit() {
    this.quoteRequestDataService.currentTargeted_sellers.subscribe(targeted_sellers => {
      this.targeted_sellers = targeted_sellers;
    });
    this.buyer = this.route.snapshot.data['buyer'];
  }

  openDialogAgricultural(index?: number): void {
    const data = {
      index: index
    };

    this.openDialog('720px', QrAgriculturalProductComponent, data);
  }

  openDialogProcessed(index?: number): void {
    const data = {
      index: index
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
    dialogRef.afterClosed().subscribe(data => {});
  }
}
