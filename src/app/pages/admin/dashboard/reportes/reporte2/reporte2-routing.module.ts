import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reporte2Page } from './reporte2.page';

const routes: Routes = [
  {
    path: '',
    component: Reporte2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reporte2PageRoutingModule {}
