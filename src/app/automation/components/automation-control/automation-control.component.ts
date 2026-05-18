import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AutomationWorkflow, AutomationSettings, WorkflowStatus } from '../../../core/models/automation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-automation-control',
  templateUrl: './automation-control.component.html',
  styleUrl: './automation-control.component.scss',
  standalone: false
})
export class AutomationControlComponent implements OnInit {
  workflows: AutomationWorkflow[] = [];
  settings: AutomationSettings = {
    jobScraping: false,
    atsScoring: false,
    cvOptimization: false,
    excelExport: false
  };
  loading = true;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAutomationData();
  }

  loadAutomationData(): void {
    this.loading = true;
    this.apiService.getAutomationStatus().subscribe({
      next: (workflows) => {
        this.workflows = workflows;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading automation data:', err);
        this.loading = false;
      }
    });
  }

  runWorkflow(workflowId: string): void {
    this.apiService.runWorkflow(workflowId).subscribe({
      next: () => {
        this.snackBar.open('Workflow started', 'Close', { duration: 3000 });
        this.loadAutomationData();
      },
      error: (err) => {
        console.error('Error running workflow:', err);
        this.snackBar.open('Error running workflow', 'Close', { duration: 3000 });
      }
    });
  }

  updateSettings(): void {
    this.apiService.updateAutomationSettings(this.settings).subscribe({
      next: () => {
        this.snackBar.open('Settings updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating settings:', err);
        this.snackBar.open('Error updating settings', 'Close', { duration: 3000 });
      }
    });
  }

  getStatusColor(status: WorkflowStatus): string {
    switch (status) {
      case WorkflowStatus.RUNNING:
        return 'primary';
      case WorkflowStatus.IDLE:
        return '';
      case WorkflowStatus.ERROR:
        return 'warn';
      case WorkflowStatus.DISABLED:
        return '';
      default:
        return '';
    }
  }
}
