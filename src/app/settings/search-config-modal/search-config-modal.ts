import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, DateRange } from '../../core/models/settings.model';

@Component({
  selector: 'app-search-config-modal',
  imports: [],
  templateUrl: './search-config-modal.html',
  styleUrl: './search-config-modal.scss',
})
export class SearchConfigModal {
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
