import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    MatGridListModule
  ]
})
export class SettingsModule { }
