import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';
import { AgmCoreModule } from '@agm/core';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { LocalisationComponent } from '../localisation/localisation.component';


@NgModule({
  imports: [
    EntryRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
  ],
  declarations: [
    EntryComponent,
    LocalisationComponent,
  ],
})
export class EntryModule {
}
