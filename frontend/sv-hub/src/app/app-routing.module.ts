import {NgModule} from '@angular/core';
import {authGuard} from "./services/auth.guard";
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chad',
    pathMatch: 'full'
  },
  {
    path: 'chad',
    loadChildren: () => import('./chad/chad.module').then(m => m.ChadPageModule),
    canActivate: [authGuard]
  }, {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }, {
    path: "subhub/:id",
    loadChildren: () => import('./chad/chad.module').then(m => m.ChadPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'transcribe',
    loadChildren: () => import('./transcribe/transcribe.module').then(m => m.TranscribePageModule),
    canActivate: [authGuard]
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
