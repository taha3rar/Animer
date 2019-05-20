import { MatTooltipModule } from '@angular/material/tooltip';
import { QuoteRequestRoutingModule } from './quote-request-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRequestListComponent } from './quote-request-list/quote-request-list.component';

@NgModule({
  declarations: [QuoteRequestListComponent],
  imports: [CommonModule, MatTooltipModule, QuoteRequestRoutingModule]
})
export class QuoteRequestModule {}
