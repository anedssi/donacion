import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Reporte3PageRoutingModule } from './reporte3-routing.module';

import { Reporte3Page } from './reporte3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Reporte3PageRoutingModule
  ],
  declarations: [Reporte3Page]
})
export class Reporte3PageModule {}
