import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductListResolver } from './resolvers/product-list.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRoutingModule } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductProfileComponent } from './product-profile/product-profile.component';
import { ProductGeneratorComponent } from './product-generator/product-generator.component';
import { ProductPackingDetailsComponent } from './product-packing-details/product-packing-details.component';
import { ProductPricingDetailsComponent } from './product-pricing-details/product-pricing-details.component';
import { ProductShippingDetailsComponent } from './product-shipping-details/product-shipping-details.component';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductReviewComponent } from './product-review/product-review.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductProfileComponent,
    ProductGeneratorComponent,
    ProductPackingDetailsComponent,
    ProductPricingDetailsComponent,
    ProductShippingDetailsComponent,
    ProductReviewComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ProductRoutingModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductListResolver]
})
export class ProductModule {}
