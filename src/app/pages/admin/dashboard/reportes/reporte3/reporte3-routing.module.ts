import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reporte3Page } from './reporte3.page';

const routes: Routes = [
  {
    path: '',
    component: Reporte3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reporte3PageRoutingModule {}
