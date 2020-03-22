import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
    {
      path: '',
      component: UserComponent,
      children: [
        {
          path: 'createUser',
          component: CreateUserComponent,
        },
        {
          path: 'userList',
          component: UserListComponent,
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
  export class UserRoutingModule {
  }