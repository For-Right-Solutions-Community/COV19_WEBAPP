import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { VitalRoutingModule } from './vital-routing.module';
import { VitalComponent } from './vital.component';
import { VitalDetailsComponent } from './vital-details/vital-details.component';
import { VitalListComponent } from './vital-list/vital-list.component';
import { CreateVitalComponent } from './create-vital/create-vital.component';
import { UpdateVitalComponent } from './update-vital/update-vital.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
    imports: [
      ThemeModule,
      VitalRoutingModule,
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
        VitalComponent, 
        VitalDetailsComponent,
        VitalListComponent,
        CreateVitalComponent,
        UpdateVitalComponent,
    ],
  })
  export class VitalModule { }