import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CV } from '../../../core/models/cv.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cv-management',
  templateUrl: './cv-management.component.html',
  styleUrl: './cv-management.component.scss',
  standalone: false
})
export class CvManagementComponent implements OnInit {
  cv: CV | null = null;
  loading = false;
  uploading = false;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCV();
  }

  loadCV(): void {
    this.loading = true;
    this.apiService.getCV().subscribe({
      next: (cv) => {
        this.cv = cv;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading CV:', err);
        this.loading = false;
        // CV might not exist yet, which is OK
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Accept .docx files or any file (for testing)
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
          file.name.endsWith('.docx') ||
          file.type === 'application/msword' ||
          file.name.endsWith('.doc') ||
          file.type === 'application/pdf' ||
          file.name.endsWith('.pdf')) {
        this.uploadCV(file);
      } else {
        this.snackBar.open('Please upload a .docx, .doc, or .pdf file', 'Close', { duration: 3000 });
      }
    }
  }

  uploadCV(file: File): void {
    this.uploading = true;
    
    // Log file details for debugging
    console.log('Uploading file:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    this.apiService.uploadCV(file).subscribe({
      next: (cv) => {
        this.cv = cv;
        this.uploading = false;
        this.snackBar.open(`CV "${file.name}" uploaded successfully`, 'Close', { duration: 3000 });
        // Reset file input
        const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err) => {
        console.error('Error uploading CV:', err);
        this.snackBar.open('Error uploading CV. Using mock data.', 'Close', { duration: 3000 });
        // Even on error, show mock CV
        this.loadCV();
        this.uploading = false;
      }
    });
  }
}
