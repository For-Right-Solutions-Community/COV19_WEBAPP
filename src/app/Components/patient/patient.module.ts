import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { CriticalPatientComponent } from './critical-patient/critical-patient.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule, NbAlertModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatPaginatorModule } from '@angular/material';
import { ChangeStatusComponent } from './change-status/change-status.component';

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
      NbWindowModule.forRoot()
    ],
    declarations: [
        PatientComponent, 
        PatientDetailsComponent,
        PatientListComponent,
        CreatePatientComponent,
        UpdatePatientComponent,
        CriticalPatientComponent,
        ChangeStatusComponent
    ],
    entryComponents: [
      ...ENTRY_COMPONENTS,
    ],
  })
  export class PatientModule { }