import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecentJobsTableComponent } from './components/recent-jobs-table/recent-jobs-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RecentJobsTableComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
