import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoodsReceiveNoteRoutingModule } from './goods-receive-note-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RouterModule } from '@angular/router';
import { GoodsReceiveNoteComponent } from './goods-receive-note.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    GoodsReceiveNoteRoutingModule,
    RouterModule,
    CommonModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [GoodsReceiveNoteComponent]
})
export class GoodsReceiveNoteModule {}
