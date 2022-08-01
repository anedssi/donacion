import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from "@angular/forms";
import { FormPageRoutingModule } from './form-routing.module';
import { FormatFileSizePipe } from './../../../../tab3/format-file-size.pipe';
import { FormPage } from './form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [FormPage, FormatFileSizePipe]
})
export class FormPageModule {}
