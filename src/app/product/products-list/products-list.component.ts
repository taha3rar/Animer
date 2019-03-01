// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './../product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/core/models/product';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { ProductService } from '@app/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ProcessedProductGeneratorComponent } from '../product-generator/processed-product-generator/processed-product-generator.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends BaseListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    protected router: Router
  ) {
    super(productService, router, {
      deleteText: 'Once deleted, you will not be able to recover this product!'
    });
    this.selectedProduct = new Product();
  }

  ngOnInit() {
    this.route.data.subscribe(({ products }) => {
      this.products = products;
    });
  }

  setProductOverview(index: string) {
    const data = {
      productList: this.products,
      index: index
    };
    index = (this.page - 1) * this.itemsPerPage + index;
    this.selectedProduct = this.products[index];
  }

  openDialogAgricultural(index?: number): void {
    const data = {
      productList: this.products,
      index: index
    };
    this.openDialog('915px', AgriculturalProductGeneratorComponent, data);
  }

  openDialogProcessed(index?: number): void {
    const data = {
      productList: this.products,
      index: index
    };
    this.openDialog('905px', ProcessedProductGeneratorComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = height;
    dialogConfig.width = '800px';

    const dialogRef = this.dialog.open(component, dialogConfig);
  }
}
