import { MatTooltipModule } from '@angular/material/tooltip';
import { QuoteRequestRoutingModule } from './quote-request-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { QuoteRequestsListComponent } from './quote-requests-list/quote-requests-list.component';

@NgModule({
  declarations: [QuoteRequestsListComponent],
  imports: [SharedModule, CommonModule, MatTooltipModule, QuoteRequestRoutingModule]
})
export class QuoteRequestModule {}
