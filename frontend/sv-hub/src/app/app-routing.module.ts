import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chad',
    pathMatch: 'full'
  },
  {
    path: 'chad',
    loadChildren: () => import('./chad/chad.module').then(m => m.ChadPageModule)
  }, {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }, {
    path: "subhub/:id",
    loadChildren: () => import('./chad/chad.module').then(m => m.ChadPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
