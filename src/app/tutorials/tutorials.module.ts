import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceTutorialsComponent } from './invoice-tutorials/invoice-tutorials.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ProductTutorialsComponent } from './product-tutorials/product-tutorials.component';
import { ContactTutorialsComponent } from './contact-tutorials/contact-tutorials.component';
import { OrdersTutorialsComponent } from './orders-tutorials/orders-tutorials.component';
import { EcosystemTutorialsComponent } from './ecosystem-tutorials/ecosystem-tutorials.component';

@NgModule({
  declarations: [
    InvoiceTutorialsComponent,
    ProductTutorialsComponent,
    ContactTutorialsComponent,
    OrdersTutorialsComponent,
    EcosystemTutorialsComponent
  ],
  imports: [CommonModule, NgxPermissionsModule.forRoot()],
  exports: [
    InvoiceTutorialsComponent,
    ProductTutorialsComponent,
    ContactTutorialsComponent,
    OrdersTutorialsComponent,
    EcosystemTutorialsComponent
  ]
})
export class TutorialsModule {}
