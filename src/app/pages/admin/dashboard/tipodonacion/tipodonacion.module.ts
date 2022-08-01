import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipodonacionPageRoutingModule } from './tipodonacion-routing.module';

import { TipodonacionPage } from './tipodonacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipodonacionPageRoutingModule
  ],
  declarations: [TipodonacionPage]
})
export class TipodonacionPageModule {}
