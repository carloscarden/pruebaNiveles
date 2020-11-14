import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'fotos',
    loadChildren: () => import('./pages/fotos/fotos.module').then( m => m.FotosPageModule)
  },
  {
    path: 'mercadopago',
    loadChildren: () => import('./pages/mercadopago/mercadopago.module').then( m => m.MercadopagoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
