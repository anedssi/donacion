/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from "@angular/forms";
import { FromPageRoutingModule } from './from-routing.module';
import { FormatFileSizePipe } from './../../../../tab3/format-file-size.pipe';
import { FromPage } from './from.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FromPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FromPage, FormatFileSizePipe]
})
export class FromPageModule {}
