import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../common/types/models.interface';
import { ISignInPayload } from './modules/sign-in/types/sign-in.interface';
import { ISignUp } from './types/sign-up.interface';
import { IResetPassword } from './modules/reset-password/types/reset-password.interface';
import { IForgotPassword } from './modules/forgot-password/types/forgot-password.interface';
import { injectMutation, injectQuery, MutationResult, QueryObserverResult } from '@ngneat/query';
import { Router } from '@angular/router';
import { authActions } from '../../common/store/app.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private _mutation = injectMutation();
  private _queryClient = injectQuery();

  signUp(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (payload: ISignUp) =>
        this._httpClient.post<{ data: IUser }>('auth/sign-up', payload).pipe(map((res) => res.data)),
      onSuccess: () => this._router.navigate(['/sign-in'])
    });
  }

  signIn(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (payload: ISignInPayload) =>
        this._httpClient.post<{ data: IUser }>('auth/sign-in', payload).pipe(map((res) => res.data)),
      onSuccess: (user) => {
        authActions.authenticateUser({ user });
        this._router.navigate(['/']);
      }
    });
  }

  signOut(): MutationResult<object, Error, unknown, unknown> {
    return this._mutation({
      mutationFn: () => this._httpClient.post('auth/sign-out', {})
    });
  }

  forgotPassword(): MutationResult<void, Error, unknown> {
    return this._mutation({
      mutationFn: (email: IForgotPassword) => this._httpClient.post<void>('auth/forgot-password', email),
      onSuccess: () => this._router.navigate(['/reset-password'])
    });
  }

  resetPassword(): MutationResult<IUser, Error, unknown> {
    return this._mutation({
      mutationFn: (payload: IResetPassword) =>
        this._httpClient.post<{ data: IUser }>('auth/reset-password', payload).pipe(map((res) => res.data)),
      onSuccess: () => this._router.navigate(['/sign-in'])
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
        this._httpClient.post<{ data: IUser }>('auth/verify-email', { token }).pipe(map((res) => res.data)),
      onSuccess: () => this._router.navigate(['/sign-in'])
    });
  }

  getProfile(): Observable<QueryObserverResult<IUser, Error>> {
    return this._queryClient({
      queryKey: ['profile'] as const,
      queryFn: () => this._httpClient.get<{ data: IUser }>('auth/profile').pipe(map((res) => res.data))
    }).result$;
  }
}
