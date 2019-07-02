import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { CurrentUserProductsResolver } from '@app/shared/resolvers/current-user-products.resolver';
import { PermissionGuard } from '../shared/guards/permission.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'product/list',
      component: ProductsListComponent,
      resolve: { products: CurrentUserProductsResolver },
      canActivate: [PermissionGuard],
      data: {
        title: extract('Products'),
        permission: 'list-products'
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard]
})
export class ProductRoutingModule {}
