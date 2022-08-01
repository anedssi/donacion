/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from "@angular/forms";
import { DonacionPageRoutingModule } from './donacion-routing.module';
import { FormatFileSizePipe } from './../../tab3/format-file-size.pipe';
import { DonacionPage } from './donacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DonacionPage, FormatFileSizePipe]
})
export class DonacionPageModule {}
