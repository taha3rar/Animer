import { QuotationGeneratorComponent } from './quotation-generator/quotation-generator.component';
import { QuoteRequestViewComponent } from './quote-request-view/quote-request-view.component';
import { QuoteRequestGeneratorComponent } from './quote-request-generator/quote-request-generator.component';
import { ConfirmationGuard } from './../shared/guards/confirmation.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { QuoteRequestsListComponent } from './quote-requests-list/quote-requests-list.component';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { UserSuppliersResolver } from '@app/shared/resolvers/user-suppliers.resolver';
import { UserEcosystemsResolver } from '@app/shared/resolvers/user-ecosystems.resolver';
import { UserResolver } from '../shared/resolvers/user.resolver';
import { QuoteRequestListResolver } from './resolvers/quote-request-list.resolver';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { QuoteRequestQuotationResolver } from './resolvers/quote-request-quotation.resolver';
import { extract } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'quote-request/list',
      component: QuoteRequestsListComponent,
      resolve: {
        quoteRequests: QuoteRequestListResolver
      },
      data: { title: extract('Quote Requests') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'quote-request/generator',
      component: QuoteRequestGeneratorComponent,
      resolve: {
        buyer: UserResolver,
        clients: UserSuppliersResolver,
        ecosystems: UserEcosystemsResolver
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'quote-request/generator/:id',
      component: QuoteRequestGeneratorComponent,
      resolve: {
        buyer: UserResolver,
        quoteRequest: QuoteRequestResolver,
        clients: UserSuppliersResolver,
        ecosystems: UserEcosystemsResolver
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'quote-request/quotation/:id',
      component: QuotationViewComponent,
      resolve: {
        quoteRequest: QuoteRequestResolver,
        quotation: QuoteRequestQuotationResolver
      }
    },
    {
      path: 'quote-request/quotation-generator/:id',
      component: QuotationGeneratorComponent,
      resolve: {
        seller: UserResolver,
        quoteRequest: QuoteRequestResolver
      }
    },
    {
      path: 'quote-request/:id',
      component: QuoteRequestViewComponent,
      resolve: {
        quoteRequest: QuoteRequestResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ConfirmationGuard]
})
export class QuoteRequestRoutingModule {}
