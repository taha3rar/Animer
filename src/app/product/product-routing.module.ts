import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { UserProductsResolver } from '@app/shared/resolvers/user-products.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductGeneratorComponent } from './product-generator/product-generator.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'product/list',
      component: ProductsListComponent,
      resolve: { products: UserProductsResolver },
      data: { title: extract('Products') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'product/generator',
      component: ProductGeneratorComponent
    },
    {
      path: 'product/edit/:id',
      component: ProductGeneratorComponent,
      resolve: { product: ProductResolver }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule {}
