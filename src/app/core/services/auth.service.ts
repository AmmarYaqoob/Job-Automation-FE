import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already authenticated (e.g., from localStorage)
    const token = localStorage.getItem('authToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  signup(username: string, email: string, full_name: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, {
      email,
      username,
      full_name,
      password
    }).pipe(
      tap(response => {
        console.log("response", response);
        localStorage.setItem('authToken', response.token);
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true)
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap((response: any) => {
        // console.log("response", response);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true)
    );
  }

  logout(token: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/logout`, {
      refresh_token: token
    }).pipe(
      tap(response => {
        console.log("response", response);
        // localStorage.setItem('authToken', response.token);
        this.isAuthenticatedSubject.next(false);
      }),
      map(() => true)
    );
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
