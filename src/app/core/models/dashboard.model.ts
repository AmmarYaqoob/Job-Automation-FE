export interface DashboardStats {
  today: JobStats;
  last7Days: JobStats;
  total: JobStats;
  atsDistribution: ATSDistribution;
  appliedVsNotApplied: AppliedStats;
  automationHealth: AutomationHealth;
  recentJobs: JobSummary[];
}

export interface JobStats {
  count: number;
  applied: number;
  notApplied: number;
}

export interface ATSDistribution {
  low: number;    // < 50
  medium: number; // 50-70
  high: number;   // > 70
}

export interface AppliedStats {
  applied: number;
  notApplied: number;
}

export interface AutomationHealth {
  lastRun: Date | string;
  failures: number;
  status: AutomationStatus;
}

export enum AutomationStatus {
  HEALTHY = 'Healthy',
  WARNING = 'Warning',
  ERROR = 'Error'
}

export interface JobSummary {
  id: string;
  title: string;
  company: string;
  atsScore: number;
  dateFound: Date | string;
}
