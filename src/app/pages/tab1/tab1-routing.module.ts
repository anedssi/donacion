import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'newdonacion',
    loadChildren: () => import('./donacion/donacion.module').then( m => m.DonacionPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./informacion/informacion.module').then( m => m.InformacionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
