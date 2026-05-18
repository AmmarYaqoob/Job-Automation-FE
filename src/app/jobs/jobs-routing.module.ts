import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent
  },
  {
    path: ':id',
    component: JobDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
