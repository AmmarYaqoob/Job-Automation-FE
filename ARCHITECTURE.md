# Job Auotomation Architecture

## Overview
Job Auotomation is a professional Angular application built with NgModule-based architecture for automated job searching, tracking, CV optimization, and application status management.

## Tech Stack
- Angular 20+
- NgModule-based architecture (NO standalone components)
- TypeScript strict mode
- SCSS
- Angular Material
- RxJS
- REST API ready

## Project Structure

```
src/app/
├── core/
│   ├── models/          # TypeScript interfaces and enums
│   ├── services/         # API service, Auth service
│   ├── guards/          # Route guards
│   └── interceptors/     # HTTP interceptors
├── shared/
│   ├── components/       # Reusable components (LoadingSpinner, PageHeader, StatsCard)
│   ├── pipes/            # Custom pipes (AtsScoreColor, DateFormat)
│   └── shared.module.ts  # Shared module exports
├── auth/
│   ├── components/       # Login component
│   └── auth.module.ts
├── dashboard/
│   ├── components/       # Dashboard, RecentJobsTable
│   └── dashboard.module.ts
├── jobs/
│   ├── components/       # JobsList, JobDetail, JobFilters
│   └── jobs.module.ts
├── applications/
│   ├── components/       # ApplicationsList
│   └── applications.module.ts
├── cv/
│   ├── components/       # CvManagement
│   └── cv.module.ts
├── automation/
│   ├── components/       # AutomationControl
│   └── automation.module.ts
├── settings/
│   ├── components/       # Settings
│   └── settings.module.ts
├── layout/
│   └── main-layout/      # Main navigation layout
├── app.module.ts         # Root module
└── app-routing.module.ts # Root routing with lazy loading
```

## Features

### 1. Dashboard
- Job stats (today / last 7 days / total)
- ATS score distribution
- Applied vs Not Applied stats
- Automation health status
- Recent jobs table

### 2. Jobs Management
- Powerful job table with filtering and search
- Color-coded rows based on ATS score
- Job detail page with full description
- ATS score breakdown
- CV optimization per job
- Mark as applied functionality

### 3. Applications Tracker
- Timeline view of applied jobs
- Status management (Applied, Interview, Rejected, Offer)
- Notes per application
- Follow-up reminders

### 4. CV Management
- Upload CV (.docx)
- Display parsed CV sections
- Keyword coverage visualization
- CV versioning (Base vs Optimized)
- Download optimized CV

### 5. Automation Control
- View automation workflows status
- Manual workflow execution
- Toggle automation features:
  - Job scraping
  - ATS scoring
  - CV optimization
  - Excel export

### 6. Settings
- Job search preferences
- ATS thresholds
- File paths configuration
- API endpoints configuration

## API Integration

The application is ready to consume REST APIs. All API calls are centralized in `ApiService`:

- `GET /jobs` - Get jobs with filters
- `GET /jobs/:id` - Get job details
- `POST /jobs/:id/apply` - Mark job as applied
- `GET /applications` - Get applications
- `PATCH /applications/:id` - Update application status
- `POST /cv/upload` - Upload CV
- `GET /cv` - Get CV
- `POST /cv/optimize` - Optimize CV for job
- `GET /cv/download/:jobId` - Download optimized CV
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /automation/status` - Get automation workflows
- `PUT /automation/settings` - Update automation settings
- `POST /automation/workflows/:id/run` - Run workflow
- `GET /settings` - Get settings
- `PUT /settings` - Update settings

## Routing

All feature modules use lazy loading:

```typescript
{
  path: 'dashboard',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
}
```

## Authentication

- AuthGuard protects all routes except `/auth/*`
- AuthInterceptor adds Bearer token to requests
- Login component handles authentication

## Styling

- Angular Material theme (Indigo Pink)
- Clean, professional SaaS-style UI
- Minimal colors
- Desktop-first design
- Responsive where appropriate

## Development

```bash
npm install
ng serve
```

The application will be available at `http://localhost:4200`

## Notes

- All modules follow NgModule pattern (no standalone components)
- TypeScript strict mode enabled
- RxJS best practices
- Clean architecture with separation of concerns
- Reusable components in SharedModule
- Centralized API service
- Type-safe models and interfaces
