import { PurchaseOrderService } from './api/po.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { UserService } from './api/user.service';
import { ApiService } from './api/api.service';
import { JwtService } from './authentication/jwt.service';
import { EcosystemService } from './api/ecosystem.service';
import { TransactionService } from './api/transaction.service';
import { OrderService } from './api/order.service';
import { InvoiceService } from './api/invoice.service';
import { ProductService } from './api/product.service';
import { ProformaInvoiceService } from './api/proforma-invoice.service';
import { ChatService } from './api/chat.service';
import { QuoteRequestService } from './api/quote-request.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule, NgxPermissionsModule.forRoot()],
  exports: [NgxPermissionsModule],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    AuthInterceptor,
    JwtService,
    ApiService,
    UserService,
    EcosystemService,
    TransactionService,
    OrderService,
    InvoiceService,
    ProductService,
    QuoteRequestService,
    ProformaInvoiceService,
    PurchaseOrderService,
    ChatService,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
