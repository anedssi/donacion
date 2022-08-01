import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesPage } from './reportes.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesPage
  },
  {
    path: 'reporte1',
    loadChildren: () => import('./reporte1/reporte1.module').then( m => m.Reporte1PageModule)
  },
  {
    path: 'reporte2',
    loadChildren: () => import('./reporte2/reporte2.module').then( m => m.Reporte2PageModule)
  },
  {
    path: 'reporte3',
    loadChildren: () => import('./reporte3/reporte3.module').then( m => m.Reporte3PageModule)
  },
  {
    path: 'reporte4',
    loadChildren: () => import('./reporte4/reporte4.module').then( m => m.Reporte4PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesPageRoutingModule {}
