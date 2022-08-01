import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbergesPageRoutingModule } from './alberges-routing.module';

import { AlbergesPage } from './alberges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbergesPageRoutingModule
  ],
  declarations: [AlbergesPage]
})
export class AlbergesPageModule {}
