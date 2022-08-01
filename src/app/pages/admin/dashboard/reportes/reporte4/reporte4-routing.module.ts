import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reporte4Page } from './reporte4.page';

const routes: Routes = [
  {
    path: '',
    component: Reporte4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reporte4PageRoutingModule {}
