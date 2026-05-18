import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvManagementComponent } from './components/cv-management/cv-management.component';

const routes: Routes = [
  {
    path: '',
    component: CvManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
