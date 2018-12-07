import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, RoundUpPipe],
  exports: [LoaderComponent, RoundUpPipe]
})
export class SharedModule {}
