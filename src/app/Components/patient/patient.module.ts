import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { CriticalPatientComponent } from './critical-patient/critical-patient.component';
@NgModule({
    imports: [
      ThemeModule,
      PatientRoutingModule,
    ],
    declarations: [
        PatientComponent, 
        PatientDetailsComponent,
        PatientListComponent,
        CreatePatientComponent,
        UpdatePatientComponent,
        CriticalPatientComponent,
    ],
  })
  export class PatientModule { }