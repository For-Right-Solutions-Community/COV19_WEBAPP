import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SymptomRoutingModule } from './symptom-routing.module';
import { SymptomComponent } from './symptom.component';
import { SymptomDetailsComponent } from './symptom-details/symptom-details.component';
import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { CreateSymptomComponent } from './create-symptom/create-symptom.component';
import { UpdateSymptomComponent } from './update-symptom/update-symptom.component';
@NgModule({
    imports: [
      ThemeModule,
      SymptomRoutingModule,
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