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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { ProductReviewProcessedComponent } from './product-generator/product-review/product-review-processed/product-review-processed.component';
import { ProductPackingDetailsComponent } from './product-generator/product-packing-details/product-packing-details.component';
import { ProductPricingDetailsComponent } from './product-generator/product-pricing-details/product-pricing-details.component';
import { ProductShippingDetailsComponent } from './product-generator/product-shipping-details/product-shipping-details.component';
import { ProductDetailsComponent } from './product-generator/product-details/product-details.component';
import { ProductDataService } from './product-generator/product-data.service';
// tslint:disable-next-line:max-line-length
import { ProductReviewAgriculturalComponent } from './product-generator/product-review/product-review-agricultural/product-review-agricultural.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductProfileComponent,
    ProductGeneratorComponent,
    ProductPackingDetailsComponent,
    ProductPricingDetailsComponent,
    ProductShippingDetailsComponent,
    ProductReviewProcessedComponent,
    ProductDetailsComponent,
    ProductReviewAgriculturalComponent
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
  providers: [ProductListResolver, ProductDataService]
})
export class ProductModule {}
