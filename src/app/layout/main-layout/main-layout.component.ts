import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: false
})
export class MainLayoutComponent {
  menuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Jobs', route: '/jobs', icon: 'work' },
    { label: 'Applications', route: '/applications', icon: 'assignment' },
    { label: 'CV Management', route: '/cv', icon: 'description' },
    { label: 'Automation', route: '/automation', icon: 'settings_applications' },
    { label: 'Settings', route: '/settings', icon: 'settings' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  logout(): void {
    const token: string = localStorage.getItem('refreshToken') || '';
    this.authService.logout(token).subscribe({
      next: (success) => {
        localStorage.clear();
        if (success) {
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
