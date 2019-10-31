import { filter } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { ProcessedProductGeneratorComponent } from './../../product/product-generator/processed-product-generator/processed-product-generator.component';
// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './../../product/product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/models/order/product';
import { MatDialogConfig, MatDialog } from '@angular/material';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-starting-guide',
  templateUrl: './starting-guide.component.html',
  styleUrls: ['./starting-guide.component.scss']
})
export class StartingGuideComponent implements OnInit {
  progressValue = '20%';
  products: Product[];
  stepCompleted = false; // temporary
  userProgress: any;
  calculatedUserProgress = 20;


  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    $('#startingGuideTab li').on('click', function(e: any) {
      e.preventDefault();
      $(this).addClass('active');
    });

    this.route.data.subscribe(({ userProgress }) => {
      this.userProgress = userProgress;
    });

    this.calculateUserProgress();
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

  nextStep(tabName: string) {
    $('#startingGuideTab li[href="#' + tabName + '"]').tab('show');
  }

  openProductModal() {
    swal({
      title: 'Which product would you like to add?',
      text: 'There are two types of Products, an Agricultural Product (like wheat) or a Processed Product (like flour)',
      className: 'swal-starting',
      buttons: {
        agri: { text: 'Agricultural Product', value: 'agri', className: 'swal-button-primary', closeModal: true },
        processed: { text: 'Processed Product', value: 'processed', className: 'swal-button-primary', closeModal: true }
      }
    }).then(value => {
      if (value === 'agri') {
        this.openDialogAgricultural(undefined);
      } else if (value === 'processed') {
        this.openDialogProcessed(undefined);
      } else {
        return false;
      }
    });
  }

  openOrderModal() {
    swal({
      title: 'Which purchase order works for you?',
      text:
        'There are two types of Purchase Orders, an Open Purchase Order lets you send an order to ' +
        'one of your contacts on Avenews-GT and an External Purchase Order is a quick order to any of your suppliers. ',
      className: 'swal-starting',
      buttons: {
        internal: {
          text: 'Internal Purchase Order',
          value: 'internal',
          className: 'swal-button-primary',
          closeModal: true
        },
        external: {
          text: 'External Purchase Order',
          value: 'external',
          className: 'swal-button-primary',
          closeModal: true
        }
      }
    }).then(value => {
      if (value === 'external') {
        this.router.navigateByUrl('/order/generator/open');
      } else if (value === 'internal') {
        this.router.navigateByUrl('/order/generator/standard');
      } else {
        return false;
      }
    });
  }

  calculateUserProgress() {
    const noOfCompleted = this.userProgress.filter(Boolean).length;
    const totalSteps = Object.keys(this.userProgress).length;

    this.calculatedUserProgress = Math.round((noOfCompleted / totalSteps) * 100);
  }
}
