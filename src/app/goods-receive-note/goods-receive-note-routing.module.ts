import { GrnGeneratorComponent } from './grn-generator/grn-generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { GoodsReceiveNoteComponent } from './goods-receive-note.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'grn',
      component: GoodsReceiveNoteComponent
    },
    {
      path: 'grn/generator',
      component: GrnGeneratorComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsReceiveNoteRoutingModule {}
