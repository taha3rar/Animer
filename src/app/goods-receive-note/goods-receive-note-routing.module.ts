import { ConfirmationGuard } from '@app/shared/guards/confirmation.guard';
import { GrnResolver } from './resolvers/grn.resolver';
import { MyGrnsResolver } from './resolvers/grn-mine.resolver';
import { GrnListComponent } from './grn-list/grn-list.component';
import { GrnGeneratorComponent } from './grn-generator/grn-generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { GrnViewComponent } from './grn-view/grn-view.component';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'grn',
      component: GrnListComponent,
      data: {
        title: 'Goods Received Notes'
      },
      resolve: {
        grns: MyGrnsResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'grn/generator',
      component: GrnGeneratorComponent,
      resolve: {
        contacts: CurrentUserContactsResolver
      },
      runGuardsAndResolvers: 'always',
      canDeactivate: [ConfirmationGuard]
    },
    {
      path: 'grn/:id',
      component: GrnViewComponent,
      resolve: {
        grn: GrnResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ConfirmationGuard]
})
export class GoodsReceiveNoteRoutingModule {}
