import { DashboardStats, JobSummary, AutomationStatus } from '../models/dashboard.model';

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  today: {
    count: 3,
    applied: 1,
    notApplied: 2
  },
  last7Days: {
    count: 12,
    applied: 5,
    notApplied: 7
  },
  total: {
    count: 45,
    applied: 18,
    notApplied: 27
  },
  atsDistribution: {
    low: 12,
    medium: 18,
    high: 15
  },
  appliedVsNotApplied: {
    applied: 18,
    notApplied: 27
  },
  automationHealth: {
    lastRun: new Date('2024-02-03T10:30:00'),
    failures: 0,
    status: AutomationStatus.HEALTHY
  },
  recentJobs: [
    {
      id: '1',
      title: 'Senior Angular Developer',
      company: 'TechCorp Inc.',
      atsScore: 85,
      dateFound: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Full Stack Developer - Angular & Node.js',
      company: 'StartupXYZ',
      atsScore: 72,
      dateFound: new Date('2024-01-20')
    },
    {
      id: '4',
      title: 'Angular Developer - Enterprise Applications',
      company: 'Enterprise Solutions Ltd.',
      atsScore: 88,
      dateFound: new Date('2024-01-28')
    },
    {
      id: '5',
      title: 'Software Engineer - Angular',
      company: 'Innovation Labs',
      atsScore: 65,
      dateFound: new Date('2024-02-01')
    },
    {
      id: '3',
      title: 'Frontend Engineer - React/Angular',
      company: 'BigTech Co.',
      atsScore: 45,
      dateFound: new Date('2024-01-25')
    }
  ] as JobSummary[]
};
