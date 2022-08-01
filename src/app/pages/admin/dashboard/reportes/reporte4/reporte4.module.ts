import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Reporte4PageRoutingModule } from './reporte4-routing.module';

import { Reporte4Page } from './reporte4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Reporte4PageRoutingModule
  ],
  declarations: [Reporte4Page]
})
export class Reporte4PageModule {}
