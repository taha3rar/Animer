import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceTutorialsComponent } from './invoice-tutorials/invoice-tutorials.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ProductTutorialsComponent } from './product-tutorials/product-tutorials.component';
import { ClientTutorialsComponent } from './client-tutorials/client-tutorials.component';
import { OrdersTutorialsComponent } from './orders-tutorials/orders-tutorials.component';
import { EcosystemTutorialsComponent } from './ecosystem-tutorials/ecosystem-tutorials.component';

@NgModule({
  declarations: [
    InvoiceTutorialsComponent,
    ProductTutorialsComponent,
    ClientTutorialsComponent,
    OrdersTutorialsComponent,
    EcosystemTutorialsComponent
  ],
  imports: [CommonModule, NgxPermissionsModule.forRoot()],
  exports: [
    InvoiceTutorialsComponent,
    ProductTutorialsComponent,
    ClientTutorialsComponent,
    OrdersTutorialsComponent,
    EcosystemTutorialsComponent
  ]
})
export class TutorialsModule {}
