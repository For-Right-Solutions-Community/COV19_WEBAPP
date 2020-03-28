import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EntryComponent } from './entry.component';
import { LocalisationComponent } from '../localisation/localisation.component';

const routes: Routes = [{
  path: '',
  component: EntryComponent,
  children: [
    
    {
      path: 'patients',
      loadChildren: () => import('../patient/patient.module')
          .then(m => m.PatientModule),
    },
    {
      path: 'interventions',
      loadChildren: () => import('../intervention/intervention.module')
          .then(m => m.InterventionModule),
    },
    {
      path: 'antecedents',
      loadChildren: () => import('../antecedent/antecedent.module')
          .then(m => m.AntecedentModule),
    },
    {
      path: 'symptoms',
      loadChildren: () => import('../symptom/symptom.module')
          .then(m => m.SymptomModule),
    },
    {
      path: 'vitals',
      loadChildren: () => import('../vital/vital.module')
          .then(m => m.VitalModule),
    },
    {
      path: 'users',
      loadChildren: () => import('../user/user.module')
          .then(m => m.UserModule),
    }/*,
    {
      path: 'localisation',
      component: LocalisationComponent,
    }*/,
    {
      path: '',
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
