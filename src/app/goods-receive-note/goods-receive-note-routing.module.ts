import { GrnViewResolver } from './reslovers/grn-view.reslover';
import { GrnResolver } from './reslovers/grn.resolver';
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
        title: 'Goods Received' // not sure what the title should be
      },
      resolve: {
        grn: GrnResolver
      }
    },
    {
      path: 'grn/generator',
      component: GrnGeneratorComponent,
      resolve: {
        contacts: CurrentUserContactsResolver
      }
    },
    {
      path: 'grn/:id',
      component: GrnViewComponent,
      resolve: { grn: GrnViewResolver }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsReceiveNoteRoutingModule {}
