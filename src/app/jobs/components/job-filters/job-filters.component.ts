import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobFilters, JobPlatform } from '../../../core/models/job.model';

@Component({
  selector: 'app-job-filters',
  templateUrl: './job-filters.component.html',
  styleUrl: './job-filters.component.scss',
  standalone: false
})
export class JobFiltersComponent implements OnInit {
  @Input() filters: JobFilters = {};
  @Output() filtersChange = new EventEmitter<JobFilters>();

  filterForm: FormGroup;
  platforms = Object.values(JobPlatform);
  showFilters = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      platform: [''],
      minAtsScore: [''],
      maxAtsScore: [''],
      applied: [''],
      dateFrom: [''],
      dateTo: ['']
    });
  }

  ngOnInit(): void {
    if (this.filters) {
      this.filterForm.patchValue({
        platform: this.filters.platform || '',
        minAtsScore: this.filters.minAtsScore || '',
        maxAtsScore: this.filters.maxAtsScore || '',
        applied: this.filters.applied !== undefined ? this.filters.applied.toString() : '',
        dateFrom: this.filters.dateFrom || '',
        dateTo: this.filters.dateTo || ''
      });
    }

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const formValue = this.filterForm.value;
    const newFilters: JobFilters = {};

    if (formValue.platform) {
      newFilters.platform = formValue.platform;
    }
    if (formValue.minAtsScore) {
      newFilters.minAtsScore = Number(formValue.minAtsScore);
    }
    if (formValue.maxAtsScore) {
      newFilters.maxAtsScore = Number(formValue.maxAtsScore);
    }
    if (formValue.applied !== '') {
      newFilters.applied = formValue.applied === 'true';
    }
    if (formValue.dateFrom) {
      newFilters.dateFrom = formValue.dateFrom;
    }
    if (formValue.dateTo) {
      newFilters.dateTo = formValue.dateTo;
    }

    this.filtersChange.emit(newFilters);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filtersChange.emit({});
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
