import { SharedModule } from '@app/shared';
import { GrnGeneratorComponent } from './grn-generator/grn-generator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoodsReceiveNoteRoutingModule } from './goods-receive-note-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RouterModule } from '@angular/router';
import { GoodsReceiveNoteComponent } from './goods-receive-note.component';
import { GrnFirstStepComponent } from './grn-generator/grn-first-step/grn-first-step.component';
import { GrnDocumentComponent } from './grn-document/grn-document.component';
import { GrnViewComponent } from './grn-view/grn-view.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    SharedModule,
    GoodsReceiveNoteRoutingModule,
    RouterModule,
    CommonModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [
    GoodsReceiveNoteComponent,
    GrnGeneratorComponent,
    GrnFirstStepComponent,
    GrnDocumentComponent,
    GrnViewComponent
  ]
})
export class GoodsReceiveNoteModule {}
