import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EntryComponent } from './entry.component';
import { LocalisationComponent } from '../localisation/localisation.component';
import { AuthGuard } from '../auth/services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: EntryComponent,
  children: [
    
    {
      path: 'patients',
      canActivate: [AuthGuard],
      loadChildren: () => import('../patient/patient.module')
          .then(m => m.PatientModule),
    },
    {
      path: 'interventions',
      canActivate: [AuthGuard],
      loadChildren: () => import('../intervention/intervention.module')
          .then(m => m.InterventionModule),
    },
    {
      path: 'antecedents',
      canActivate: [AuthGuard],
      loadChildren: () => import('../antecedent/antecedent.module')
          .then(m => m.AntecedentModule),
    },
    {
      path: 'symptoms',
      canActivate: [AuthGuard],
      loadChildren: () => import('../symptom/symptom.module')
          .then(m => m.SymptomModule),
    },
    {
      path: 'vitals',
      canActivate: [AuthGuard],
      loadChildren: () => import('../vital/vital.module')
          .then(m => m.VitalModule),
    },
    {
      path: 'users',
      canActivate: [AuthGuard],
      data: { roles: ["ROLE_ADMIN"]},
      loadChildren: () => import('../user/user.module')
          .then(m => m.UserModule),
    }/*,
    {
      path: 'localisation',
      component: LocalisationComponent,
    }*/,
    {
      path: '',
      canActivate: [AuthGuard],
      redirectTo: 'patients',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'patients',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {
}
