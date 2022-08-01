import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipodonacionPage } from './tipodonacion.page';

const routes: Routes = [
  {
    path: '',
    component: TipodonacionPage
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipodonacionPageRoutingModule {}
