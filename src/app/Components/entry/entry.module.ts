import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';
import { AgmCoreModule } from '@agm/core';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { ThemeModule } from '../../@theme/theme.module';


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
  ],
})
export class EntryModule {
}
