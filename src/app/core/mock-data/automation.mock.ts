import { AutomationWorkflow, AutomationSettings, WorkflowStatus } from '../models/automation.model';

export const MOCK_AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf1',
    name: 'Job Scraping',
    enabled: true,
    lastRun: new Date('2024-02-03T08:00:00'),
    nextRun: new Date('2024-02-04T08:00:00'),
    status: WorkflowStatus.IDLE,
    failures: 0
  },
  {
    id: 'wf2',
    name: 'ATS Scoring',
    enabled: true,
    lastRun: new Date('2024-02-03T08:05:00'),
    nextRun: new Date('2024-02-04T08:05:00'),
    status: WorkflowStatus.IDLE,
    failures: 0
  },
  {
    id: 'wf3',
    name: 'CV Optimization',
    enabled: false,
    lastRun: new Date('2024-02-02T10:00:00'),
    nextRun: undefined,
    status: WorkflowStatus.DISABLED,
    failures: 0
  },
  {
    id: 'wf4',
    name: 'Excel Export',
    enabled: true,
    lastRun: new Date('2024-02-03T09:00:00'),
    nextRun: new Date('2024-02-04T09:00:00'),
    status: WorkflowStatus.IDLE,
    failures: 0
  }
];

export const MOCK_AUTOMATION_SETTINGS: AutomationSettings = {
  jobScraping: true,
  atsScoring: true,
  cvOptimization: false,
  excelExport: true
};
