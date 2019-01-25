import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/core/models/product';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { ProductService } from '@app/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends BaseListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  page = 1;
  itemsPerPage = 6;

  constructor(private route: ActivatedRoute, private productService: ProductService, protected router: Router) {
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
    index = (this.page - 1) * this.itemsPerPage + index;
    this.selectedProduct = this.products[index];
  }
}
