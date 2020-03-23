import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AntecedentDetailsComponent } from './antecedent-details/antecedent-details.component';
import { AntecedentListComponent } from './antecedent-list/antecedent-list.component';
import { CreateAntecedentComponent } from './create-antecedent/create-antecedent.component';
import { UpdateAntecedentComponent } from './update-antecedent/update-antecedent.component';
import { AntecedentRoutingModule } from './antecedent-routing.module';
import { AntecedentComponent } from './antecedent.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
    imports: [
      ThemeModule,
      AntecedentRoutingModule,
      NbInputModule,
      NbCardModule,
      NbButtonModule,
      NbActionsModule,
      NbUserModule,
      NbCheckboxModule,
      NbRadioModule,
      NbDatepickerModule,
      NbSelectModule,
      NbIconModule,
      Ng2SmartTableModule,
    ],
    declarations: [
      AntecedentComponent, 
      AntecedentDetailsComponent,
      AntecedentListComponent,
      CreateAntecedentComponent,
      UpdateAntecedentComponent,
    ],
  })
  export class AntecedentModule { }