import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VitalComponent } from './vital.component';
import { CreateVitalComponent } from './create-vital/create-vital.component';
import { VitalListComponent } from './vital-list/vital-list.component';
const routes: Routes = [
    {
      path: '',
      component: VitalComponent,
      children: [
        {
          path: 'createVital',
          component: CreateVitalComponent,
        },
        {
          path: 'vitalList',
          component: VitalListComponent,
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
  export class VitalRoutingModule {
  }