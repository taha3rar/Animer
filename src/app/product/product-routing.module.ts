import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { CurrentUserProductsResolver } from '@app/shared/resolvers/current-user-products.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'product/list',
      component: ProductsListComponent,
      resolve: { products: CurrentUserProductsResolver },
      data: { title: extract('Products') },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule {}
