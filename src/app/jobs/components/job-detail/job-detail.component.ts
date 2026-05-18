import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Job } from '../../../core/models/job.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss',
  standalone: false
})
export class JobDetailComponent implements OnInit {
  job: Job | null = null;
  loading = true;
  optimizing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.loadJob(jobId);
    }
  }

  loadJob(jobId: string): void {
    this.loading = true;
    this.apiService.getJob(jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading job:', err);
        this.snackBar.open('Error loading job details', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  optimizeCV(): void {
    if (!this.job) return;

    this.optimizing = true;
    this.apiService.optimizeCVForJob(this.job.id).subscribe({
      next: (optimization) => {
        this.snackBar.open('CV optimized successfully!', 'Close', { duration: 3000 });
        this.optimizing = false;
        // Reload job to get updated ATS score
        this.loadJob(this.job!.id);
      },
      error: (err) => {
        console.error('Error optimizing CV:', err);
        this.snackBar.open('Error optimizing CV', 'Close', { duration: 3000 });
        this.optimizing = false;
      }
    });
  }

  markAsApplied(): void {
    if (!this.job) return;

    this.apiService.applyToJob(this.job.id).subscribe({
      next: () => {
        this.snackBar.open('Job marked as applied', 'Close', { duration: 3000 });
        this.loadJob(this.job!.id);
      },
      error: (err) => {
        console.error('Error marking job as applied:', err);
        this.snackBar.open('Error marking job as applied', 'Close', { duration: 3000 });
      }
    });
  }

  openJobLink(): void {
    if (this.job?.jobUrl) {
      window.open(this.job.jobUrl, '_blank');
    }
  }

  downloadOptimizedCV(): void {
    if (!this.job) return;

    this.apiService.downloadOptimizedCV(this.job.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_${this.job!.company}_${this.job!.title}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.snackBar.open('CV downloaded successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error downloading CV:', err);
        this.snackBar.open('Error downloading CV', 'Close', { duration: 3000 });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }
}
