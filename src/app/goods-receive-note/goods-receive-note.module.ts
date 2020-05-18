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
import { GrnFirstStepComponent } from './grn-generator/grn-first-step/grn-first-step.component';
import { GrnDocumentComponent } from './grn-document/grn-document.component';
import { GrnViewComponent } from './grn-view/grn-view.component';
import { GrnListComponent } from './grn-list/grn-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material';
import { GrnResolver } from './resolvers/grn.resolver';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';
import { GrnProductGeneratorComponent } from './grn-generator/grn-product-generator/grn-product-generator.component';
import { MyGrnsResolver } from './resolvers/grn-mine.resolver';
import { GrnDocumentListComponent } from './grn-document-list/grn-document-list.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DateStringPipe } from '@app/shared/pipes/date-string.pipe';
import { NgbDateCustomParserFormatter } from '@app/shared/customization/ngb-date-parser-il-format';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GoodsReceiveNoteRoutingModule,
    RouterModule,
    CommonModule,
    MatTooltipModule,
    NgxPermissionsModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  declarations: [
    GrnGeneratorComponent,
    GrnListComponent,
    GrnFirstStepComponent,
    GrnProductGeneratorComponent,
    GrnDocumentComponent,
    GrnViewComponent,
    GrnListComponent,
    GrnDocumentListComponent
  ],
  providers: [MyGrnsResolver, GrnResolver, CurrentUserContactsResolver]
})
export class GoodsReceiveNoteModule {}
