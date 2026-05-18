import { Application, ApplicationStatus } from '../models/application.model';

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app1',
    jobId: '1',
    jobTitle: 'Senior Angular Developer',
    company: 'TechCorp Inc.',
    status: ApplicationStatus.INTERVIEW,
    appliedDate: new Date('2024-01-16'),
    notes: 'Initial screening passed. Technical interview scheduled for next week.',
    interviewDate: new Date('2024-02-10'),
    followUpDate: new Date('2024-02-12')
  },
  {
    id: 'app2',
    jobId: '4',
    jobTitle: 'Angular Developer - Enterprise Applications',
    company: 'Enterprise Solutions Ltd.',
    status: ApplicationStatus.APPLIED,
    appliedDate: new Date('2024-01-29'),
    notes: 'Application submitted. Waiting for response.',
    followUpDate: new Date('2024-02-05')
  },
  {
    id: 'app3',
    jobId: '6',
    jobTitle: 'Senior Frontend Developer',
    company: 'WebSolutions Inc.',
    status: ApplicationStatus.OFFER,
    appliedDate: new Date('2024-01-10'),
    notes: 'Received offer. Negotiating salary.',
    offerDate: new Date('2024-02-01')
  },
  {
    id: 'app4',
    jobId: '7',
    jobTitle: 'Angular Architect',
    company: 'Architecture Firm',
    status: ApplicationStatus.REJECTED,
    appliedDate: new Date('2024-01-05'),
    notes: 'Not selected. They were looking for more enterprise experience.',
    rejectedDate: new Date('2024-01-20')
  }
];
