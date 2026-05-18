import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';

@NgModule({
  declarations: [
    ApplicationsListComponent
  ],
  imports: [
    SharedModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }
