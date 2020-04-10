import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomComponent } from './symptom.component';
import { CreateSymptomComponent } from './create-symptom/create-symptom.component';
const routes: Routes = [
    {
      path: '',
      component: SymptomComponent,
      children: [
        {
          path: 'createSymptom',
          component: CreateSymptomComponent,
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
  export class SymptomRoutingModule {
  }