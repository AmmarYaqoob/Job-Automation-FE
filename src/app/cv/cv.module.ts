import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CvRoutingModule } from './cv-routing.module';
import { CvManagementComponent } from './components/cv-management/cv-management.component';

@NgModule({
  declarations: [
    CvManagementComponent
  ],
  imports: [
    SharedModule,
    CvRoutingModule
  ]
})
export class CvModule { }
