import { Job, JobPlatform } from '../models/job.model';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Angular Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    platform: JobPlatform.LINKEDIN,
    atsScore: 85,
    keywordsMatch: 92,
    dateFound: new Date('2024-01-15'),
    applied: true,
    applicationDate: new Date('2024-01-16'),
    jobUrl: 'https://linkedin.com/jobs/view/123456',
    description: 'We are looking for a Senior Angular Developer with 5+ years of experience in building scalable web applications. You will work on cutting-edge projects using Angular, TypeScript, and modern web technologies.',
    extractedKeywords: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'JavaScript', 'HTML', 'CSS', 'REST API'],
    missingKeywords: ['GraphQL', 'Docker'],
    atsBreakdown: {
      skills: 90,
      experience: 85,
      education: 80,
      keywords: 92,
      formatting: 88
    }
  },
  {
    id: '2',
    title: 'Full Stack Developer - Angular & Node.js',
    company: 'StartupXYZ',
    location: 'Remote',
    platform: JobPlatform.INDEED,
    atsScore: 72,
    keywordsMatch: 78,
    dateFound: new Date('2024-01-20'),
    applied: false,
    jobUrl: 'https://indeed.com/job/789012',
    description: 'Join our fast-growing startup as a Full Stack Developer. You will work with Angular on the frontend and Node.js on the backend. Experience with MongoDB and AWS is a plus.',
    extractedKeywords: ['Angular', 'Node.js', 'MongoDB', 'AWS', 'JavaScript', 'TypeScript'],
    missingKeywords: ['Docker', 'Kubernetes', 'GraphQL'],
    atsBreakdown: {
      skills: 75,
      experience: 70,
      education: 75,
      keywords: 78,
      formatting: 65
    }
  },
  {
    id: '3',
    title: 'Frontend Engineer - React/Angular',
    company: 'BigTech Co.',
    location: 'New York, NY',
    platform: JobPlatform.LINKEDIN,
    atsScore: 45,
    keywordsMatch: 50,
    dateFound: new Date('2024-01-25'),
    applied: false,
    jobUrl: 'https://linkedin.com/jobs/view/345678',
    description: 'We are seeking a Frontend Engineer with strong experience in React or Angular. The ideal candidate will have experience with state management, testing, and modern build tools.',
    extractedKeywords: ['React', 'Angular', 'JavaScript', 'TypeScript', 'State Management'],
    missingKeywords: ['RxJS', 'NgRx', 'Jest', 'Cypress'],
    atsBreakdown: {
      skills: 50,
      experience: 45,
      education: 40,
      keywords: 50,
      formatting: 45
    }
  },
  {
    id: '4',
    title: 'Angular Developer - Enterprise Applications',
    company: 'Enterprise Solutions Ltd.',
    location: 'Austin, TX',
    platform: JobPlatform.XING,
    atsScore: 88,
    keywordsMatch: 95,
    dateFound: new Date('2024-01-28'),
    applied: true,
    applicationDate: new Date('2024-01-29'),
    jobUrl: 'https://xing.com/jobs/456789',
    description: 'Looking for an experienced Angular Developer to join our enterprise team. You will work on large-scale applications using Angular, TypeScript, RxJS, and NgRx. Experience with microservices architecture is preferred.',
    extractedKeywords: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Microservices', 'Enterprise', 'JavaScript'],
    missingKeywords: [],
    atsBreakdown: {
      skills: 90,
      experience: 88,
      education: 85,
      keywords: 95,
      formatting: 90
    }
  },
  {
    id: '5',
    title: 'Software Engineer - Angular',
    company: 'Innovation Labs',
    location: 'Seattle, WA',
    platform: JobPlatform.INDEED,
    atsScore: 65,
    keywordsMatch: 70,
    dateFound: new Date('2024-02-01'),
    applied: false,
    jobUrl: 'https://indeed.com/job/101112',
    description: 'Join our innovation team as a Software Engineer specializing in Angular. You will develop new features and maintain existing applications. Strong problem-solving skills required.',
    extractedKeywords: ['Angular', 'TypeScript', 'JavaScript', 'Problem Solving'],
    missingKeywords: ['RxJS', 'NgRx', 'Testing', 'CI/CD'],
    atsBreakdown: {
      skills: 70,
      experience: 65,
      education: 60,
      keywords: 70,
      formatting: 55
    }
  }
];
