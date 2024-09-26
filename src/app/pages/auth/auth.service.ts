import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { IUser } from '../../core/types/models.interface';
import { ISignInPayload } from './modules/sign-in/types/sign-in.type';
import { ISignUp } from './modules/sign-up/types/sign-up.type';
import { IResetPassword } from './modules/reset-password/types/reset-password.type';
import { IForgotPassword } from './modules/forgot-password/types/forgot-password.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _httpClient = inject(HttpClient);

  getProfile(): Observable<{ data: IUser }> {
    return this._httpClient.get<{ data: IUser }>('auth/profile');
  }

  signIn(payload: ISignInPayload): Observable<IUser> {
    return this._httpClient.post<{ data: IUser }>('auth/sign-in', payload).pipe(map((res) => res.data));
  }

  signOut() {
    return this._httpClient.post<void>('auth/sign-out', {}).pipe(map(() => of(null)));
  }

  signUp(payload: ISignUp): Observable<IUser> {
    return this._httpClient.post<{ data: IUser }>('auth/sign-up', payload).pipe(map((res) => res.data));
  }

  forgotPassword(email: IForgotPassword): Observable<void> {
    return this._httpClient.post<void>('auth/forgot-password', email);
  }

  resetPassword(payload: IResetPassword): Observable<IUser> {
    return this._httpClient.post<{ data: IUser }>('auth/reset-password', payload).pipe(map((res) => res.data));
  }

  resendEmailVerification(email: string) {
    return this._httpClient.post<void>('auth/verify-email/resend-token', { email }).pipe(map(() => null));
  }

  verifyEmail(token: string): Observable<IUser> {
    return this._httpClient.post<{ data: IUser }>('auth/verify-email', { token }).pipe(map((res) => res.data));
  }
}
