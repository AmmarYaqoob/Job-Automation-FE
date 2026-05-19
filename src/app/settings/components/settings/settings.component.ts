import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Settings, DateRange, LocationKeyword } from '../../../core/models/settings.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  loading = false;
  dateRanges = Object.values(DateRange);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      jobSearch: this.fb.group({
        // location: this.fb.array([
        //   this.fb.group({
        //     country: [''],
        //     is_paused: [false],
        //     created_at: [new Date()]
        //   })
        // ]),
        country: this.fb.array([
          this.fb.control('')
        ]),
        // location: [''],
        roleKeywords: this.fb.array([
          this.fb.control('')
        ]),
        platforms: this.fb.array([
          this.fb.control('')
        ]),
        dateRange: [DateRange.LAST_7D]
      }),
      ats: this.fb.group({
        lowThreshold: [50],
        mediumThreshold: [70],
        highThreshold: [70]
      }),
      filePaths: this.fb.group({
        cvUploadPath: [''],
        cvDownloadPath: [''],
        excelExportPath: ['']
      }),
      api: this.fb.group({
        baseUrl: ['http://localhost:3000/api'],
        jobsEndpoint: ['/jobs'],
        applicationsEndpoint: ['/applications'],
        cvEndpoint: ['/cv'],
        automationEndpoint: ['/automation']
      })
    });
  }

  ngOnInit(): void {
    // this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    this.apiService.getSettings().subscribe({
      next: (settings) => {
        this.populateForm(settings);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading settings:', err);
        this.loading = false;
      }
    });
  }

  populateForm(settings: Settings): void {
    const jobSearch = this.settingsForm.get('jobSearch') as FormGroup;
    const roleKeywords = jobSearch.get('roleKeywords') as FormArray;
    // const locationKeywords = jobSearch.get('locationKeywords') as FormArray;
    const country = jobSearch.get('country') as FormArray;
    const platforms = jobSearch.get('platforms') as FormArray;

    // Clear existing arrays
    // while (roleKeywords.length !== 0) {
    //   roleKeywords.removeAt(0);
    // }
    // while (locationKeywords.length !== 0) {
    //   locationKeywords.removeAt(0);
    // }
    // while (platforms.length !== 0) {
    //   platforms.removeAt(0);
    // }
    // debugger

    settings.jobSearch.country.forEach(keyword => {
      country.push(this.fb.control(keyword));
    });
    settings.jobSearch.roleKeywords.forEach(keyword => {
      roleKeywords.push(this.fb.control(keyword));
    });

      settings.jobSearch.platforms.forEach(platform => {
      platforms.push(this.fb.control(platform));
    });

    // this.settingsForm.patchValue({
    //   jobSearch: {
    //     location: settings.jobSearch.location,
    //     dateRange: settings.jobSearch.dateRange
    //   },
    //   ats: settings.ats,
    //   filePaths: settings.filePaths,
    //   api: settings.api
    // });

    // settings.jobSearch.locationKeywords?.forEach((item: LocationKeyword) => {
    //   locationKeywords.push(
    //     this.fb.group({
    //       country: [item.country],
    //       is_paused: [item.is_paused],
    //       created_at: [item.created_at]
    //     })
    //   );
    // });
  }
  
  get country(): FormArray {
    return this.settingsForm.get('jobSearch.country') as FormArray;
  }

  get roleKeywords(): FormArray {
    return this.settingsForm.get('jobSearch.roleKeywords') as FormArray;
  }

  get platforms(): FormArray {
    return this.settingsForm.get('jobSearch.platforms') as FormArray;
  }

  addCountry(): void {
    this.country.push(this.fb.control(''));
  }

  removeCountry(index: number): void {
    this.country.removeAt(index);
  }

  addRoleKeyword(): void {
    this.roleKeywords.push(this.fb.control(''));
  }

  removeRoleKeyword(index: number): void {
    this.roleKeywords.removeAt(index);
  }

  addPlatform(): void {
    this.platforms.push(this.fb.control(''));
  }

  removePlatform(index: number): void {
    this.platforms.removeAt(index);
  }

  saveSettings(): void {
    debugger
    const formValue = this.settingsForm.value;
    const settings: Settings = {
      jobSearch: {
        country: formValue.jobSearch.country,
        location: formValue.jobSearch.location,
        // locationKeywords: formValue.jobSearch.locationKeywords,
        roleKeywords: formValue.jobSearch.roleKeywords.filter((k: string) => k.trim() !== ''),
        platforms: formValue.jobSearch.platforms.filter((p: string) => p.trim() !== ''),
        dateRange: formValue.jobSearch.dateRange
      },
      ats: formValue.ats,
      // filePaths: formValue.filePaths,
      // api: formValue.api
    };

    this.apiService.updateSettings(settings).subscribe({
      next: () => {
        this.snackBar.open('Settings saved successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error saving settings:', err);
        this.snackBar.open('Error saving settings', 'Close', { duration: 3000 });
      }
    });
  }
}
