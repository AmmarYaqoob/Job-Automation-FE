import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { SearchConfigModalComponent } from './search-config-modal/search-config-modal';


@NgModule({
  declarations: [
    SettingsComponent,
    SearchConfigModalComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class SettingsModule { }
