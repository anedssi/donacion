import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'donacion',
    loadChildren: () =>
    import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () =>
    import('./pages/auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/donacion/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
