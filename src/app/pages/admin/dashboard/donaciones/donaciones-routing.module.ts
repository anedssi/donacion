import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonacionesPage } from './donaciones.page';

const routes: Routes = [
  {
    path: '',
    component: DonacionesPage
  },
  {
    path: 'from',
    loadChildren: () => import('./from/from.module').then( m => m.FromPageModule)
  },
  {
    path: 'from/:id',
    loadChildren: () => import('./from/from.module').then( m => m.FromPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonacionesPageRoutingModule {}
