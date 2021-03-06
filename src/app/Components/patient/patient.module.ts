import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CriticalPatientComponent } from './critical-patient/critical-patient.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule, NbAlertModule, NbWindowModule, NbTabsetModule, NbListModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatPaginatorModule } from '@angular/material';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { GlobalPatientComponent } from './global-patient/global-patient.component';
import { DetailsPatientTabComponent } from './global-patient/details-patient-tab/details-patient-tab.component';
import { UpdatePatientTabComponent } from './global-patient/update-patient-tab/update-patient-tab.component';
import { CreatePatientTabComponent } from './global-patient/create-patient-tab/create-patient-tab.component';
import { TreatedPatientComponent } from './treated-patient/treated-patient.component';
import { CreateSymptomComponent } from '../symptom/create-symptom/create-symptom.component';
import { CreateVitalComponent } from '../vital/create-vital/create-vital.component';
import { PatientSymptomHistoricComponent } from '../symptom/patient-symptom-historic/patient-symptom-historic.component';
import { CreateInterventionComponent } from '../intervention/create-intervention/create-intervention.component';
import { ChangeStatusSAMUComponent } from './change-status-samu/change-status-samu.component';
import { EnAttentePatientComponent } from './en-attente-patient/en-attente-patient.component';

const ENTRY_COMPONENTS = [
  ChangeStatusComponent,ChangeStatusSAMUComponent
];

@NgModule({
    imports: [
      ThemeModule,
      PatientRoutingModule,
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
      NbAlertModule,
      FormsModule,
      ReactiveFormsModule,
      MatSortModule,
      MatPaginatorModule,
      NbWindowModule.forRoot(),
      NbTabsetModule,
      NbListModule,
    ],
    declarations: [
        PatientComponent, 
        PatientListComponent,
        CriticalPatientComponent,
        ChangeStatusComponent,
        GlobalPatientComponent,
        DetailsPatientTabComponent,
        UpdatePatientTabComponent,
        CreatePatientTabComponent,
        TreatedPatientComponent,
        CreateSymptomComponent,
        CreateVitalComponent,
        PatientSymptomHistoricComponent,
        CreateInterventionComponent,
        ChangeStatusSAMUComponent,
        EnAttentePatientComponent,
    ],
    entryComponents: [
      ...ENTRY_COMPONENTS,
    ],
  })
  export class PatientModule { }