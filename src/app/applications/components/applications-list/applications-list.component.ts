import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Application, ApplicationStatus } from '../../../core/models/application.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss',
  standalone: false
})
export class ApplicationsListComponent implements OnInit {
  applications: Application[] = [];
  loading = true;
  statuses = Object.values(ApplicationStatus);

  displayedColumns: string[] = [
    'jobTitle',
    'company',
    'status',
    'appliedDate',
    'interviewDate',
    'notes',
    'actions'
  ];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.apiService.getApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading applications:', err);
        this.snackBar.open('Error loading applications', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  updateStatus(application: Application, status: ApplicationStatus): void {
    this.apiService.updateApplicationStatus(application.id, status).subscribe({
      next: () => {
        this.snackBar.open('Status updated successfully', 'Close', { duration: 3000 });
        this.loadApplications();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.snackBar.open('Error updating status', 'Close', { duration: 3000 });
      }
    });
  }

  getStatusColor(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.APPLIED:
        return 'primary';
      case ApplicationStatus.INTERVIEW:
        return 'accent';
      case ApplicationStatus.OFFER:
        return 'primary';
      case ApplicationStatus.REJECTED:
        return 'warn';
      default:
        return '';
    }
  }
}
