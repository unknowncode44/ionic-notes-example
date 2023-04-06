import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  {
    path: 'notes',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notes/:id',
    loadChildren: () => import('./detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'waiting/:id',
    loadChildren: () => import('./waiting/waiting.module').then( m => m.WaitingPageModule)
  },

  {
    path: 'waiting',
    redirectTo: 'waiting',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
