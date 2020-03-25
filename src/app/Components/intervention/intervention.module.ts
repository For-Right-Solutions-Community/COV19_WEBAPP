import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InterventionComponent } from './intervention.component';
import { InterventionDetailsComponent } from './intervention-details/intervention-details.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
import { CreateInterventionComponent } from './create-intervention/create-intervention.component';
import { UpdateInterventionComponent } from './update-intervention/update-intervention.component';
import { InterventionRoutingModule } from './intervention-routing.module';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
      ThemeModule,
      InterventionRoutingModule,
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
        InterventionComponent, 
        InterventionDetailsComponent,
        InterventionListComponent,
        CreateInterventionComponent,
        UpdateInterventionComponent,
    ],
  })
  export class InterventionModule { }