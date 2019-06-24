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
import { CurrentUserSuppliersResolver } from '@app/shared/resolvers/current-user-suppliers.resolver';
import { CurrentUserEcosystemsResolver } from '@app/shared/resolvers/current-user-ecosystems.resolver';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { QuoteRequestListResolver } from './resolvers/quote-request-list.resolver';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { QuoteRequestQuotationResolver } from './resolvers/quote-request-quotation.resolver';
import { extract } from '@app/core';
import { QuoteRequestGuard } from '@app/shared/guards/quoteRequest.guard';
import { QuotationGuard } from '@app/shared/guards/quotation.guard';
import { PermissionGuard } from '../shared/guards/permission.guard';

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
        buyer: CurrentUserResolver,
        clients: CurrentUserSuppliersResolver,
        ecosystems: CurrentUserEcosystemsResolver
      },
      canActivate: [PermissionGuard],
      data: {
        permission: 'create-qr'
      },
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'quote-request/generator/:id',
      component: QuoteRequestGeneratorComponent,
      resolve: {
        buyer: CurrentUserResolver,
        quoteRequest: QuoteRequestResolver,
        clients: CurrentUserSuppliersResolver,
        ecosystems: CurrentUserEcosystemsResolver
      },
      canActivate: [QuoteRequestGuard],
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'quote-request/quotation/:id',
      component: QuotationViewComponent,
      resolve: {
        quoteRequest: QuoteRequestResolver,
        quotation: QuoteRequestQuotationResolver
      },
      canActivate: [QuotationGuard]
    },
    {
      path: 'quote-request/quotation-generator/:id',
      component: QuotationGeneratorComponent,
      resolve: {
        seller: CurrentUserResolver,
        quoteRequest: QuoteRequestResolver
      },
      canActivate: [QuotationGuard]
    },
    {
      path: 'quote-request/:id',
      component: QuoteRequestViewComponent,
      resolve: {
        quoteRequest: QuoteRequestResolver
      },
      canActivate: [QuoteRequestGuard],
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ConfirmationGuard, QuoteRequestGuard, QuotationGuard, PermissionGuard]
})
export class QuoteRequestRoutingModule {}
