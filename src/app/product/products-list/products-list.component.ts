// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './../product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/core/models/product';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { ProductService } from '@app/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ProcessedProductGeneratorComponent } from '../product-generator/processed-product-generator/processed-product-generator.component';
import { Sort } from '@angular/material/sort';

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
      this.products = products.slice();
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

  openDialogAgricultural(product: Product): void {
    const data = {
      product: product
    };
    this.openDialog('915px', AgriculturalProductGeneratorComponent, data);
  }

  openDialogProcessed(product: Product): void {
    const data = {
      product: product
    };
    this.openDialog('905px', ProcessedProductGeneratorComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.height = height;
    dialogConfig.width = '800px';
    dialogConfig.data = dialogData;
    this.dialog.open(component, dialogConfig);
  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.products = data;
      return;
    }

    this.products = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'product':
          return super.compare(a.produce, b.produce, isAsc);
        case 'sku':
          return super.compare(a.sku, b.sku, isAsc);
        case 'packageType':
          return super.compare(a.type_of_package, b.type_of_package, isAsc);
        case 'availability':
          return super.compare(
            a.product_type !== 'agricultural' ? Number(a.quantity) : Number(a.total_weight),
            b.product_type !== 'agricultural' ? Number(b.quantity) : Number(b.total_weight),
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}
