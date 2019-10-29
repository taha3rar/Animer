// tslint:disable-next-line:max-line-length
import { ProcessedProductGeneratorComponent } from './../../product/product-generator/processed-product-generator/processed-product-generator.component';
// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './../../product/product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/models/order/product';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Client } from '@app/core/models/user/client';

declare const $: any;

@Component({
  selector: 'app-starting-guide',
  templateUrl: './starting-guide.component.html',
  styleUrls: ['./starting-guide.component.scss']
})
export class StartingGuideComponent implements OnInit {
  progressValue = '20%';
  products: Product[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    $('#startingGuideTab li').on('click', function(e: any) {
      e.preventDefault();
      $(this).addClass('active');
    });
  }

  openDialogAgricultural(product: Product): void {
    const data = {
      product: product
    };
    this.openDialog('92vh', AgriculturalProductGeneratorComponent, data);
  }

  openDialogProcessed(product: Product): void {
    const data = {
      product: product
    };
    this.openDialog('92vh', ProcessedProductGeneratorComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.height = height;
    dialogConfig.width = '800px';
    dialogConfig.data = dialogData;
    this.dialog.open(component, dialogConfig);
  }
}
