import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { VitalRoutingModule } from './vital-routing.module';
import { VitalComponent } from './vital.component';
import { VitalDetailsComponent } from './vital-details/vital-details.component';
import { VitalListComponent } from './vital-list/vital-list.component';
import { CreateVitalComponent } from './create-vital/create-vital.component';
import { UpdateVitalComponent } from './update-vital/update-vital.component';
@NgModule({
    imports: [
      ThemeModule,
      VitalRoutingModule,
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