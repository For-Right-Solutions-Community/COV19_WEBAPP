import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Components/auth/login/login.component';
import { AuthGuard } from './Components/auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'menu',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Components/entry/entry.module')
      .then(m => m.EntryModule),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', 
  canActivate: [AuthGuard],
  redirectTo: 'menu',
  pathMatch: 'full' },
  { path: '**', redirectTo: 'menu' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
