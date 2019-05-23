import { QrProcessedProductComponent } from './qr-processed-product/qr-processed-product.component';
import { QrAgriculturalProductComponent } from './qr-agricultural-product/qr-agricultural-product.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { currencies } from '@app/shared/helpers/currencies';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-quote-request-generator-form',
  templateUrl: './quote-request-generator-form.component.html',
  styleUrls: ['./quote-request-generator-form.component.scss']
})
export class QuoteRequestGeneratorFormComponent implements OnInit {
  currencies = currencies;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

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
