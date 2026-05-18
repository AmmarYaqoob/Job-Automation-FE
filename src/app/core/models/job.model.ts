export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  platform: JobPlatform;
  atsScore: number;
  keywordsMatch: number;
  dateFound: Date | string;
  applied: boolean;
  applicationDate?: Date | string;
  jobUrl: string;
  description?: string;
  extractedKeywords?: string[];
  missingKeywords?: string[];
  atsBreakdown?: ATSBreakdown;
}

export enum JobPlatform {
  INDEED = 'Indeed',
  LINKEDIN = 'LinkedIn',
  XING = 'XING',
  OTHER = 'Other'
}

export interface ATSBreakdown {
  skills: number;
  experience: number;
  education: number;
  keywords: number;
  formatting: number;
}

export interface JobFilters {
  platform?: JobPlatform;
  minAtsScore?: number;
  maxAtsScore?: number;
  dateFrom?: Date;
  dateTo?: Date;
  applied?: boolean;
  searchTerm?: string;
}
