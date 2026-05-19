import { Settings, DateRange } from '../models/settings.model';

export const MOCK_SETTINGS: Settings = {
  jobSearch: {
    location: 'San Francisco, CA',
    country: ['USA'],
    roleKeywords: ['Angular', 'TypeScript', 'Frontend Developer', 'Software Engineer'],
    platforms: ['LinkedIn', 'Indeed', 'XING'],
    dateRange: DateRange.LAST_7D
  },
  ats: {
    lowThreshold: 50,
    mediumThreshold: 70,
    highThreshold: 70
  },
  // filePaths: {
  //   cvUploadPath: './uploads/cv',
  //   cvDownloadPath: './downloads/cv',
  //   excelExportPath: './exports'
  // },
  // api: {
  //   baseUrl: 'http://localhost:3000/api',
  //   jobsEndpoint: '/jobs',
  //   applicationsEndpoint: '/applications',
  //   cvEndpoint: '/cv',
  //   automationEndpoint: '/automation'
  // }
};
