import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { CurrentUserProductsResolver } from '@app/shared/resolvers/current-user-products.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { ProductRoutingModule } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductProfileComponent } from './product-profile/product-profile.component';
import { MatDialogModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { ProcessedProductGeneratorComponent } from './product-generator/processed-product-generator/processed-product-generator.component';
import { TutorialsModule } from '@app/tutorials/tutorials.module';
import { MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductProfileComponent,
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
    TutorialsModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers: [CurrentUserProductsResolver, ProductResolver]
})
export class ProductModule {}
