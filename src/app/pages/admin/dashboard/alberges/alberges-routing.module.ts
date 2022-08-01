import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbergesPage } from './alberges.page';

const routes: Routes = [
  {
    path: '',
    component: AlbergesPage
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  }
  ,
  {
    path: 'form/:id',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbergesPageRoutingModule {}
