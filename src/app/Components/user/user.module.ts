import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
@NgModule({
    imports: [
      ThemeModule,
      UserRoutingModule,
    ],
    declarations: [
        UserComponent, 
        UserDetailsComponent,
        UserListComponent,
        CreateUserComponent,
        UpdateUserComponent,
    ],
  })
  export class UserModule { }