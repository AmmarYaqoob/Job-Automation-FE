import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Job, JobFilters } from '../models/job.model';
import { Application } from '../models/application.model';
import { CV, CVOptimization } from '../models/cv.model';
import { DashboardStats } from '../models/dashboard.model';
import { AutomationWorkflow, AutomationSettings } from '../models/automation.model';
import { Settings } from '../models/settings.model';
import { MOCK_JOBS } from '../mock-data/jobs.mock';
import { MOCK_DASHBOARD_STATS } from '../mock-data/dashboard.mock';
import { MOCK_APPLICATIONS } from '../mock-data/applications.mock';
import { MOCK_AUTOMATION_WORKFLOWS, MOCK_AUTOMATION_SETTINGS } from '../mock-data/automation.mock';
import { MOCK_CV } from '../mock-data/cv.mock';
import { MOCK_SETTINGS } from '../mock-data/settings.mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Default, should be configurable

  constructor(private http: HttpClient) {}

  // Jobs
  getJobs(filters?: JobFilters): Observable<Job[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.platform) params = params.set('platform', filters.platform);
      if (filters.minAtsScore !== undefined) params = params.set('minAtsScore', filters.minAtsScore.toString());
      if (filters.maxAtsScore !== undefined) params = params.set('maxAtsScore', filters.maxAtsScore.toString());
      if (filters.dateFrom) params = params.set('dateFrom', filters.dateFrom.toISOString());
      if (filters.dateTo) params = params.set('dateTo', filters.dateTo.toISOString());
      if (filters.applied !== undefined) params = params.set('applied', filters.applied.toString());
      if (filters.searchTerm) params = params.set('searchTerm', filters.searchTerm);
    }
    return this.http.get<Job[]>(`${this.baseUrl}/jobs`, { params }).pipe(
      catchError(() => {
        let filteredJobs = [...MOCK_JOBS];
        if (filters) {
          if (filters.platform) {
            filteredJobs = filteredJobs.filter(job => job.platform === filters.platform);
          }
          if (filters.minAtsScore !== undefined) {
            filteredJobs = filteredJobs.filter(job => job.atsScore >= filters.minAtsScore!);
          }
          if (filters.maxAtsScore !== undefined) {
            filteredJobs = filteredJobs.filter(job => job.atsScore <= filters.maxAtsScore!);
          }
          if (filters.applied !== undefined) {
            filteredJobs = filteredJobs.filter(job => job.applied === filters.applied);
          }
          if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
              job.title.toLowerCase().includes(term) ||
              job.company.toLowerCase().includes(term)
            );
          }
        }
        return of(filteredJobs).pipe(delay(500));
      })
    );
  }

  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/jobs/${id}`).pipe(
      catchError(() => {
        const job = MOCK_JOBS.find(j => j.id === id);
        return job ? of(job).pipe(delay(500)) : throwError(() => new Error('Job not found'));
      })
    );
  }

  applyToJob(jobId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/jobs/${jobId}/apply`, {}).pipe(
      catchError(() => {
        // Update mock data
        const job = MOCK_JOBS.find(j => j.id === jobId);
        if (job) {
          job.applied = true;
          job.applicationDate = new Date();
        }
        return of(void 0).pipe(delay(500));
      })
    );
  }

  // Applications
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/applications`).pipe(
      catchError(() => of(MOCK_APPLICATIONS).pipe(delay(500)))
    );
  }

  updateApplicationStatus(applicationId: string, status: string): Observable<Application> {
    return this.http.patch<Application>(`${this.baseUrl}/applications/${applicationId}`, { status }).pipe(
      catchError(() => {
        const app = MOCK_APPLICATIONS.find(a => a.id === applicationId);
        if (app) {
          app.status = status as any;
        }
        return app ? of(app).pipe(delay(500)) : throwError(() => new Error('Application not found'));
      })
    );
  }

  addApplicationNote(applicationId: string, note: string): Observable<Application> {
    return this.http.patch<Application>(`${this.baseUrl}/applications/${applicationId}`, { notes: note }).pipe(
      catchError(() => {
        const app = MOCK_APPLICATIONS.find(a => a.id === applicationId);
        if (app) {
          app.notes = note;
        }
        return app ? of(app).pipe(delay(500)) : throwError(() => new Error('Application not found'));
      })
    );
  }

  // CV
  uploadCV(file: File): Observable<CV> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    // Create headers to ensure proper file upload
    return this.http.post<CV>(`${this.baseUrl}/cv/upload`, formData, {
      reportProgress: true
    }).pipe(
      catchError(() => {
        // Return mock CV with uploaded file name
        const mockCV = { ...MOCK_CV };
        mockCV.fileName = file.name;
        mockCV.uploadDate = new Date();
        return of(mockCV).pipe(delay(1000));
      })
    );
  }

  getCV(): Observable<CV> {
    return this.http.get<CV>(`${this.baseUrl}/cv`).pipe(
      catchError(() => of(MOCK_CV).pipe(delay(500)))
    );
  }

  optimizeCVForJob(jobId: string): Observable<CVOptimization> {
    return this.http.post<CVOptimization>(`${this.baseUrl}/cv/optimize`, { jobId }).pipe(
      catchError(() => {
        const job = MOCK_JOBS.find(j => j.id === jobId);
        const optimization: CVOptimization = {
          jobId,
          originalSkills: MOCK_CV.skills,
          optimizedSkills: [...MOCK_CV.skills, ...(job?.missingKeywords || [])],
          addedKeywords: job?.missingKeywords || [],
          removedKeywords: [],
          atsScoreBefore: job?.atsScore || 0,
          atsScoreAfter: (job?.atsScore || 0) + 10
        };
        return of(optimization).pipe(delay(1000));
      })
    );
  }

  downloadOptimizedCV(jobId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/cv/download/${jobId}`, { responseType: 'blob' }).pipe(
      catchError(() => {
        // Return a mock blob (empty file)
        const blob = new Blob(['Mock CV content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        return of(blob).pipe(delay(500));
      })
    );
  }

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`).pipe(
      catchError(() => of(MOCK_DASHBOARD_STATS).pipe(delay(500)))
    );
  }

  // Automation
  getAutomationStatus(): Observable<AutomationWorkflow[]> {
    return this.http.get<AutomationWorkflow[]>(`${this.baseUrl}/automation/status`).pipe(
      catchError(() => of(MOCK_AUTOMATION_WORKFLOWS).pipe(delay(500)))
    );
  }

  updateAutomationSettings(settings: AutomationSettings): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/automation/settings`, settings).pipe(
      catchError(() => {
        Object.assign(MOCK_AUTOMATION_SETTINGS, settings);
        return of(void 0).pipe(delay(500));
      })
    );
  }

  runWorkflow(workflowId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/automation/workflows/${workflowId}/run`, {}).pipe(
      catchError(() => {
        const workflow = MOCK_AUTOMATION_WORKFLOWS.find(w => w.id === workflowId);
        if (workflow) {
          workflow.lastRun = new Date();
          workflow.status = 'Running' as any;
        }
        return of(void 0).pipe(delay(1000));
      })
    );
  }

  // Settings
  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.baseUrl}/settings`).pipe(
      catchError(() => of(MOCK_SETTINGS).pipe(delay(5)))
    );
  }

  updateSettings(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(`${this.baseUrl}/settings`, settings).pipe(
      catchError(() => {
        Object.assign(MOCK_SETTINGS, settings);
        return of(MOCK_SETTINGS).pipe(delay(500));
      })
    );
  }
}
