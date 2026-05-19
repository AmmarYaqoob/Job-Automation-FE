export interface Settings {
  jobSearch: JobSearchSettings;
  ats: ATSSettings;
  // filePaths: FilePathSettings;
  // api: APISettings;
}

export interface JobSearchSettings {
  location: string;
  country: string[];
  // locationKeywords?: [];
  roleKeywords: string[];
  platforms: string[];
  dateRange: DateRange;
}

export enum DateRange {
  LAST_24H = 'Last 24h',
  LAST_7D = 'Last 7 days',
  LAST_30D = 'Last 30 days',
  ALL = 'All'
}

export interface ATSSettings {
  lowThreshold: number;
  mediumThreshold: number;
  highThreshold: number;
}

export interface FilePathSettings {
  cvUploadPath: string;
  cvDownloadPath: string;
  excelExportPath: string;
}

export interface APISettings {
  baseUrl: string;
  jobsEndpoint: string;
  applicationsEndpoint: string;
  cvEndpoint: string;
  automationEndpoint: string;
}

export interface LocationKeyword {
  country: string;
  is_paused: boolean;
  created_at: Date;
}