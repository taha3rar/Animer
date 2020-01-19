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
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [FilterPipe]
})
export class ProductsListComponent extends BaseListComponent implements OnInit {
  products: Product[];
  hasProducts: boolean;
  selectedProduct: Product;
  searchTerm: string;
  tooltips = tooltips.products;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    protected router: Router
  ) {
    super(productService, router, {
      deleteText: 'Once deleted, you will not be able to recover this product!',
      pageName: 'products'
    });
    this.selectedProduct = new Product();
  }

  ngOnInit() {
    this.route.data.subscribe(({ products }) => {
      this.hasProducts = products.length > 0;
      this.products = products.slice();
    });
  }

  setProductOverview(index: string) {
    const data = {
      productList: this.products,
      index: index
    };
    index = (this.currentPage - 1) * this.itemsPerPage + index;
    this.selectedProduct = this.products[index];
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
        case 'description':
          return super.compare(
            a.product_type === 'input' ? Number(a.item_measurement_amount) : Number(a.quantity),
            b.product_type === 'input' ? Number(b.item_measurement_amount) : Number(b.quantity),
            isAsc
          );
        case 'type':
          return super.compare(a.product_type, b.product_type, isAsc);
        case 'availability':
          return super.compare(
            a.product_type === 'agricultural' ? Number(a.total_weight) : Number(a.total_amount_items),
            b.product_type === 'agricultural' ? Number(b.total_weight) : Number(b.total_amount_items),
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}
