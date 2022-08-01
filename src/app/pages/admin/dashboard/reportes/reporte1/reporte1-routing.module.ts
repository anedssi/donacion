import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reporte1Page } from './reporte1.page';

const routes: Routes = [
  {
    path: '',
    component: Reporte1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reporte1PageRoutingModule {}
