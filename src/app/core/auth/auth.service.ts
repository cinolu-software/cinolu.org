import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { IUser } from '../types/models.interface';
import { ISignInPayload } from './types/sign-in.interface';
import { ISignUpPayload } from './types/sign-up.interface';
import { IResetPassword } from './types/reset-password.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token: string = this.getToken();
  private _httpClient = inject(HttpClient);

  getToken(): string {
    return typeof window !== 'undefined' && localStorage.getItem('token');
  }

  storeToken(token: string): void {
    if (token && typeof window !== 'undefined') localStorage.setItem('token', token);
  }

  getProfile(): Observable<{ data: IUser }> {
    return this._httpClient.get<{ data: IUser }>('auth/profile');
  }
  signIn(payload: ISignInPayload): Observable<{ access_token: string }> {
    return this._httpClient.post<{ access_token: string }>('auth/sign-in', payload);
  }

  signOut(): Observable<boolean> {
    typeof window !== 'undefined' && localStorage.removeItem('token');
    return of(true);
  }

  signUp(payload: ISignUpPayload): Observable<{ data: IUser }> {
    return this._httpClient.post<{ data: IUser }>('auth/sign-up', payload);
  }

  forgotPassword(email: { email: string }): Observable<void> {
    return this._httpClient.post<void>('auth/forgot-password', email);
  }

  resetPassword(payload: IResetPassword): Observable<{ access_token: string }> {
    return this._httpClient.post<{ access_token: string }>('auth/reset-password', payload);
  }

  verifyEmail(token: string): Observable<{ access_token: string }> {
    return this._httpClient.post<{ access_token: string }>('auth/verify-email', { token });
  }

  check(): Observable<boolean> {
    return this.getProfile().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
