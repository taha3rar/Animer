import { QuoteRequestListComponent } from './quote-request-list/quote-request-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'quote-request/list',
      component: QuoteRequestListComponent
    }
  ])
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class QuoteRequestRoutingModule {}
