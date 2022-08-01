import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Reporte2PageRoutingModule } from './reporte2-routing.module';

import { Reporte2Page } from './reporte2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Reporte2PageRoutingModule
  ],
  declarations: [Reporte2Page]
})
export class Reporte2PageModule {}
