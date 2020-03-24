import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Components/auth/login/login.component';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: () => import('./Components/entry/entry.module')
      .then(m => m.EntryModule),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: '**', redirectTo: 'menu' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
