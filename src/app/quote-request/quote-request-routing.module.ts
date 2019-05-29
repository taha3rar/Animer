import { QuotationGeneratorComponent } from './quotation-generator/quotation-generator.component';
import { QuoteRequestGeneratorComponent } from './quote-request-generator/quote-request-generator.component';
import { ConfirmationGuard } from './../shared/guards/confirmation.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { QuoteRequestsListComponent } from './quote-requests-list/quote-requests-list.component';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { QuoteRequestClientsResolver } from './resolvers/quote-request-clients.resolver';
import { QuoteRequestEcosystemsResolver } from './resolvers/quote-request-ecosystems.resolver';
import { QuoteRequestBuyerResolver } from './resolvers/quote-request-buyer.resolver';
import { QuoteRequestListResolver } from './resolvers/quote-request-list.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'quote-request/list',
      component: QuoteRequestsListComponent,
      resolve: {
        quoteRequests: QuoteRequestListResolver
      }
    },
    {
      path: 'quote-request/generator',
      component: QuoteRequestGeneratorComponent,
      resolve: {
        buyer: QuoteRequestBuyerResolver,
        clients: QuoteRequestClientsResolver,
        ecosystems: QuoteRequestEcosystemsResolver
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'quote-request/quotation/:id',
      component: QuotationViewComponent
    },
    {
      path: 'quote-request/quotation-generator',
      component: QuotationGeneratorComponent
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ConfirmationGuard]
})
export class QuoteRequestRoutingModule {}
