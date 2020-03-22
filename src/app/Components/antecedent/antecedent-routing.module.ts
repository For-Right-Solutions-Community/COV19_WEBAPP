import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntecedentComponent } from './antecedent.component';
import { CreateAntecedentComponent } from './create-antecedent/create-antecedent.component';
import { AntecedentListComponent } from './antecedent-list/antecedent-list.component';
const routes: Routes = [
    {
      path: '',
      component: AntecedentComponent,
      children: [
        {
          path: 'createAntecedent',
          component: CreateAntecedentComponent,
        },
        {
          path: 'antecedentList',
          component: AntecedentListComponent,
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
  export class AntecedentRoutingModule {
  }