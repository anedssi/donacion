/* eslint-disable @typescript-eslint/quotes */
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { Tab3Pipe } from '../tab3.pipe';
import { FormatFileSizePipe } from './format-file-size.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab3Page, Tab3Pipe, FormatFileSizePipe]
})
export class Tab3PageModule {}
