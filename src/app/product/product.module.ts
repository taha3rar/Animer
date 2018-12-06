import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductListResolver } from './resolvers/product-list.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, TranslateModule, ProductRoutingModule],
  providers: [ProductListResolver]
})
export class ProductModule {}
