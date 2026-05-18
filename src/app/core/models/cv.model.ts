export interface CV {
  id: string;
  fileName: string;
  uploadDate: Date | string;
  sections: CVSection[];
  skills: string[];
  version: CVVersion;
  optimizedForJobId?: string;
}

export interface CVSection {
  type: CVSectionType;
  content: string;
  order: number;
}

export enum CVSectionType {
  PERSONAL_INFO = 'Personal Info',
  SUMMARY = 'Summary',
  EXPERIENCE = 'Experience',
  EDUCATION = 'Education',
  SKILLS = 'Skills',
  CERTIFICATIONS = 'Certifications',
  PROJECTS = 'Projects'
}

export enum CVVersion {
  BASE = 'Base',
  OPTIMIZED = 'Optimized'
}

export interface CVOptimization {
  jobId: string;
  originalSkills: string[];
  optimizedSkills: string[];
  addedKeywords: string[];
  removedKeywords: string[];
  atsScoreBefore: number;
  atsScoreAfter: number;
}
