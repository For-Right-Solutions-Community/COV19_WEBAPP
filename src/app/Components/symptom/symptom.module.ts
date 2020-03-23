import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SymptomRoutingModule } from './symptom-routing.module';
import { SymptomComponent } from './symptom.component';
import { SymptomDetailsComponent } from './symptom-details/symptom-details.component';
import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { CreateSymptomComponent } from './create-symptom/create-symptom.component';
import { UpdateSymptomComponent } from './update-symptom/update-symptom.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
    imports: [
      ThemeModule,
      SymptomRoutingModule,
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
        SymptomComponent, 
        SymptomDetailsComponent,
        SymptomListComponent,
        CreateSymptomComponent,
        UpdateSymptomComponent,
    ],
  })
  export class SymptomModule { }