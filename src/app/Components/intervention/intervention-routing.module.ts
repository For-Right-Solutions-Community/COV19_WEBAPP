import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterventionComponent } from './intervention.component';
import { CreateInterventionComponent } from './create-intervention/create-intervention.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
const routes: Routes = [
    {
      path: '',
      component: InterventionComponent,
      children: [
        {
          path: 'createIntervention',
          component: CreateInterventionComponent,
        },
        {
          path: 'interventionList',
          component: InterventionListComponent,
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
  export class InterventionRoutingModule {
  }