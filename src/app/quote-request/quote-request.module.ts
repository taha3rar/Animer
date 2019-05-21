import { MatTooltipModule } from '@angular/material/tooltip';
import { QuoteRequestRoutingModule } from './quote-request-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRequestListBuyerComponent } from './quote-request-list-buyer/quote-request-list-buyer.component';

@NgModule({
  declarations: [QuoteRequestListBuyerComponent],
  imports: [CommonModule, MatTooltipModule, QuoteRequestRoutingModule]
})
export class QuoteRequestModule {}
