import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BaseProduct } from './product-generator/base-product';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { UserProductsResolver } from '@app/shared/resolvers/user-products.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRoutingModule } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductProfileComponent } from './product-profile/product-profile.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
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
import { SharedModule } from '@app/shared';
import { BaseProductReview } from './product-generator/product-review/base-product-review';
// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { ProcessedProductGeneratorComponent } from './product-generator/processed-product-generator/processed-product-generator.component';
import { TutorialsModule } from '@app/tutorials/tutorials.module';

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
    ProductReviewAgriculturalComponent,
    AgriculturalProductGeneratorComponent,
    ProcessedProductGeneratorComponent
  ],
  entryComponents: [AgriculturalProductGeneratorComponent, ProcessedProductGeneratorComponent],

  imports: [
    CommonModule,
    TranslateModule,
    ProductRoutingModule,
    NgxPaginationModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    SharedModule,
    TutorialsModule
  ],
  providers: [UserProductsResolver, ProductResolver, ProductDataService]
})
export class ProductModule {}
