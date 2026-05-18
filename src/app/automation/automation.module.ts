import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AutomationRoutingModule } from './automation-routing.module';
import { AutomationControlComponent } from './components/automation-control/automation-control.component';

@NgModule({
  declarations: [
    AutomationControlComponent
  ],
  imports: [
    SharedModule,
    AutomationRoutingModule
  ]
})
export class AutomationModule { }
