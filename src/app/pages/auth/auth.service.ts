import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../../common/types/models.interface';
import { ISignInPayload } from './types/sign-in.interface';
import { ISignUp } from './types/sign-up.interface';
import { IResetPassword } from './types/reset-password.interface';
import { IForgotPassword } from './types/forgot-password.interface';
import { injectMutation, injectQuery, MutationResult } from '@ngneat/query';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _mutation = injectMutation();
  private _queryClient = injectQuery();

  getProfile() {
    return this._queryClient({
      queryKey: ['profile'] as const,
      queryFn: () => this._httpClient.get<{ data: IUser }>('auth/profile').pipe(map((res) => res.data))
    });
  }

  signIn(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (payload: ISignInPayload): Observable<IUser> =>
        this._httpClient.post<{ data: IUser }>('auth/sign-in', payload).pipe(map((res) => res.data))
    });
  }

  signOut(): MutationResult<object, Error, unknown, unknown> {
    return this._mutation({
      mutationFn: () => this._httpClient.post('auth/sign-out', {})
    });
  }

  signUp(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (payload: ISignUp) =>
        this._httpClient.post<{ data: IUser }>('auth/sign-up', payload).pipe(map((res) => res.data))
    });
  }

  forgotPassword(): MutationResult<void, Error, unknown> {
    return this._mutation({
      mutationFn: (email: IForgotPassword) => this._httpClient.post<void>('auth/forgot-password', email)
    });
  }

  resetPassword(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (payload: IResetPassword) =>
        this._httpClient.post<{ data: IUser }>('auth/reset-password', payload).pipe(map((res) => res.data))
    });
  }

  resendEmailVerification(): MutationResult<void, Error, unknown> {
    return this._mutation({
      mutationFn: (email: string) => this._httpClient.post<void>('auth/verify-email/resend-token', { email })
    });
  }

  verifyEmail(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (token: string) =>
        this._httpClient.post<{ data: IUser }>('auth/verify-email', { token }).pipe(map((res) => res.data))
    });
  }
}
