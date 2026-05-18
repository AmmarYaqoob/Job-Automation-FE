import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Job, JobFilters, JobPlatform } from '../../../core/models/job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  standalone: false
})
export class JobsListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  loading = true;
  filters: JobFilters = {};
  searchTerm = '';
  
  displayedColumns: string[] = [
    'title',
    'company',
    'location',
    'platform',
    'atsScore',
    'keywordsMatch',
    'dateFound',
    'applied',
    'applicationDate',
    'actions'
  ];

  platforms = Object.values(JobPlatform);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.apiService.getJobs(this.filters).subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.jobs];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
      );
    }

    this.filteredJobs = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(filters: JobFilters): void {
    this.filters = filters;
    this.loadJobs();
  }

  navigateToJob(jobId: string): void {
    this.router.navigate(['/jobs', jobId]);
  }

  getRowClass(job: Job): string {
    if (job.applied) {
      return 'applied-row';
    }
    if (job.atsScore < 50) {
      return 'ats-low';
    } else if (job.atsScore >= 50 && job.atsScore <= 70) {
      return 'ats-medium';
    } else {
      return 'ats-high';
    }
  }
}
