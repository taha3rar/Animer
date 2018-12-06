import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductListResolver } from './resolvers/product-list.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'product/list',
      component: ProductsListComponent,
      resolve: { products: ProductListResolver },
      data: { title: extract('Products') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule {}
