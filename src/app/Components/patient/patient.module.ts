import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { CriticalPatientComponent } from './critical-patient/critical-patient.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule, NbAlertModule, NbWindowModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatPaginatorModule } from '@angular/material';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { GlobalPatientComponent } from './global-patient/global-patient.component';
import { DetailsPatientTabComponent } from './global-patient/details-patient-tab/details-patient-tab.component';
import { UpdatePatientTabComponent } from './global-patient/update-patient-tab/update-patient-tab.component';
import { CreatePatientTabComponent } from './global-patient/create-patient-tab/create-patient-tab.component';
import { TreatedPatientComponent } from './treated-patient/treated-patient.component';

const ENTRY_COMPONENTS = [
  ChangeStatusComponent
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
    ],
    declarations: [
        PatientComponent, 
        PatientDetailsComponent,
        PatientListComponent,
        CreatePatientComponent,
        UpdatePatientComponent,
        CriticalPatientComponent,
        ChangeStatusComponent,
        GlobalPatientComponent,
        DetailsPatientTabComponent,
        UpdatePatientTabComponent,
        CreatePatientTabComponent,
        TreatedPatientComponent,
    ],
    entryComponents: [
      ...ENTRY_COMPONENTS,
    ],
  })
  export class PatientModule { }