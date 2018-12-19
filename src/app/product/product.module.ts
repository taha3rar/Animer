import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductListResolver } from './resolvers/product-list.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRoutingModule } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, TranslateModule, ProductRoutingModule, NgxPaginationModule, NgbModule],
  providers: [ProductListResolver]
})
export class ProductModule {}
