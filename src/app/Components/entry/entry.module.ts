import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';


import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { LocalisationComponent } from '../localisation/localisation.component';


@NgModule({
  imports: [
    EntryRoutingModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    EntryComponent,
    LocalisationComponent,
  ],
})
export class EntryModule {
}
