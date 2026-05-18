export interface AutomationWorkflow {
  id: string;
  name: string;
  enabled: boolean;
  lastRun?: Date | string;
  nextRun?: Date | string;
  status: WorkflowStatus;
  failures: number;
}

export enum WorkflowStatus {
  RUNNING = 'Running',
  IDLE = 'Idle',
  ERROR = 'Error',
  DISABLED = 'Disabled'
}

export interface AutomationSettings {
  jobScraping: boolean;
  atsScoring: boolean;
  cvOptimization: boolean;
  excelExport: boolean;
}
