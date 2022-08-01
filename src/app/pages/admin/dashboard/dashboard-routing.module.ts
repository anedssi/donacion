import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'donaciones',
    loadChildren: () => import('./donaciones/donaciones.module').then( m => m.DonacionesPageModule)
  },
  {
    path: 'tipodonacion',
    loadChildren: () => import('./tipodonacion/tipodonacion.module').then( m => m.TipodonacionPageModule)
  },
  {
    path: 'alberges',
    loadChildren: () => import('./alberges/alberges.module').then( m => m.AlbergesPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then( m => m.ReportesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
