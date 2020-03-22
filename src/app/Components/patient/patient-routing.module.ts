import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CriticalPatientComponent } from './critical-patient/critical-patient.component';
const routes: Routes = [
    {
      path: '',
      component: PatientComponent,
      children: [
        {
          path: 'createPatient',
          component: CreatePatientComponent,
        },
        {
          path: 'patientList',
          component: PatientListComponent,
        },
        {
          path: 'criticalPatient',
          component: CriticalPatientComponent,
        },
        {
          path: '',
          redirectTo: 'patientList',
          pathMatch: 'full',
        },
        {
          path: '**',
          redirectTo: 'patientList',
        },
      ],
    },
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [
      RouterModule,
    ],
  })
  export class PatientRoutingModule {
  }