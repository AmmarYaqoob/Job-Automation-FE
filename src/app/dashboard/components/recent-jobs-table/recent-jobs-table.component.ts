import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobSummary } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-recent-jobs-table',
  templateUrl: './recent-jobs-table.component.html',
  styleUrl: './recent-jobs-table.component.scss',
  standalone: false
})
export class RecentJobsTableComponent {
  @Input() jobs: JobSummary[] = [];
  
  displayedColumns: string[] = ['title', 'company', 'atsScore', 'dateFound'];

  constructor(private router: Router) {}

  navigateToJob(jobId: string): void {
    this.router.navigate(['/jobs', jobId]);
  }
}
