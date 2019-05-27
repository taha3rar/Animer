import { QuotationGeneratorComponent } from './quotation-generator/quotation-generator.component';
import { QuoteRequestGeneratorComponent } from './quote-request-generator/quote-request-generator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { QuoteRequestsListComponent } from './quote-requests-list/quote-requests-list.component';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'quote-request/list',
      component: QuoteRequestsListComponent
    },
    {
      path: 'quote-request/generator',
      component: QuoteRequestGeneratorComponent
    },
    {
<<<<<<< HEAD
      path: 'quote-request/quotation/:id',
      component: QuotationViewComponent
=======
      path: 'quote-request/quotation-generator',
      component: QuotationGeneratorComponent
>>>>>>> Quotation generator 1st and 2nd steps
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class QuoteRequestRoutingModule {}
