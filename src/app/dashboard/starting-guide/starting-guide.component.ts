import { includes } from 'lodash';
import { filter } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { ProcessedProductGeneratorComponent } from './../../product/product-generator/processed-product-generator/processed-product-generator.component';
// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './../../product/product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { Component, OnInit, AfterViewInit, AfterContentInit, Renderer2, ElementRef } from '@angular/core';
import { Product } from '@app/core/models/order/product';
import { MatDialogConfig, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
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
  products: Product[];
  userProgress = {};
  currentUser: any;

  swalWithStyledButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-primary'
    },
    buttonsStyling: false
  });

  progressCompleted = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ currentUser, progress }) => {
      this.userProgress = progress;
      this.currentUser = currentUser;
      this.checkCurrentStep();
    });
  }

  checkCurrentStep() {
    $(function() {
      $('#startingGuideTab')
        .find('.current-step')
        .removeClass('current-step');
      $('#startingGuideTab li').each(function() {
        if (
          $(this).hasClass('completed') &&
          !$(this)
            .next()
            .hasClass('completed')
        ) {
          $(this)
            .next()
            .addClass('current-step');
          $(this)
            .next()
            .trigger('click');
          return false;
        }
      });
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

  nextStep(tabName: string) {
    $('#startingGuideTab li[href="#' + tabName + '"]').tab('show');
  }

  openProductModal() {
    this.swalWithStyledButtons
      .fire({
        title: 'Which product would you like to add?',
        html:
          '<p>There are two types of Products</p> <ul><li>Agricultural Product (like wheat)</li>' +
          '<li>Processed Product (like flour)</li></ul>',
        confirmButtonText: 'Agricultural Product',
        cancelButtonText: 'Processed Product',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.openDialogAgricultural(undefined);
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
          return false;
        } else if (!result.value) {
          this.openDialogProcessed(undefined);
        }
      });
  }

  openOrderModal() {
    this.swalWithStyledButtons
      .fire({
        title: 'Which purchase order works for you?',
        html:
          '<p>There are two types of Purchase Orders</p><ul><li>Internal Purchase Order lets you send an order to' +
          ' one of your contacts on Avenews-GT </li>' +
          '<li>External Purchase Order is a quick order to any of your suppliers.</li></ul> ',
        confirmButtonText: 'Internal Purchase Order',
        cancelButtonText: 'External Purchase Order',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.router.navigateByUrl('/order/generator/standard');
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
          return false;
        } else if (!result.value) {
          this.router.navigateByUrl('/order/generator/open');
        }
      });
  }
}
