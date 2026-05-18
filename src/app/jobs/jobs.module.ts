import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobFiltersComponent } from './components/job-filters/job-filters.component';

@NgModule({
  declarations: [
    JobsListComponent,
    JobDetailComponent,
    JobFiltersComponent
  ],
  imports: [
    SharedModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
