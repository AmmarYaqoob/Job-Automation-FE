import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Invalid credentials';
            this.loading = false;
          }
        },
        error: (err) => {
          this.error = 'Login failed. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  loginWithGoogle(): void {
    this.loading = true;
    this.error = '';
    
    // TODO: Implement Google OAuth
    // For now, simulate Google login
    this.authService.login('google@example.com', 'google').subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Google login failed';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Google login failed. Please try again.';
        this.loading = false;
      }
    });
  }

  loginWithFacebook(): void {
    this.loading = true;
    this.error = '';
    
    // TODO: Implement Facebook OAuth
    // For now, simulate Facebook login
    this.authService.login('facebook@example.com', 'facebook').subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Facebook login failed';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Facebook login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
