export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: Date | string;
  notes?: string;
  followUpDate?: Date | string;
  interviewDate?: Date | string;
  offerDate?: Date | string;
  rejectedDate?: Date | string;
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  OFFER = 'Offer'
}
