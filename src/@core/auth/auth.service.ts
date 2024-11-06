import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { IUser } from 'app/common/types/models.type';
import { ISignIn } from '../../app/pages/auth/types/sign-in.type';
import { ISignUp } from '../../app/pages/auth/types/sign-up.type';
import { IResetPassword } from '../../app/pages/auth/types/reset-password.type';
import { IForgotPassword } from '../../app/pages/auth/types/forgot-password.type';
import { injectMutation, MutationResult } from '@ngneat/query';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #mutation = injectMutation();
  #http = inject(HttpClient);
  #router = inject(Router);
  #store = inject(Store);

  signUp(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['sign-up'] as const,
      mutationFn: (payload: ISignUp) =>
        this.#http.post<{ data: IUser }>('auth/sign-up', payload).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  signIn(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['sign-in'] as const,
      mutationFn: (payload: ISignIn) =>
        this.#http.post<{ data: IUser }>('auth/login', payload).pipe(map((res) => res.data)),
      onSuccess: (user) => {
        this.#store.dispatch(authActions.signIn({ user }));
        this.#router.navigate(['/']);
      }
    });
  }

  forgotPassword(): MutationResult<void, Error, unknown> {
    return this.#mutation({
      mutationKey: ['forgot-password'] as const,
      mutationFn: (email: IForgotPassword) => this.#http.post<void>('auth/forgot-password', email),
      onSuccess: () => this.#router.navigate(['/reset-password'])
    });
  }

  resetPassword(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['reset-password'] as const,
      mutationFn: (payload: IResetPassword) =>
        this.#http.post<{ data: IUser }>('auth/reset-password', payload).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  resendEmailVerification(): MutationResult<void, Error, unknown> {
    return this.#mutation({
      mutationKey: ['resend-token'] as const,
      mutationFn: (email: string) => this.#http.post<void>('auth/verify-email/resend-token', { email })
    });
  }

  verifyEmail(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationKey: ['verify-email'] as const,
      mutationFn: (token: string) =>
        this.#http.post<{ data: IUser }>('auth/verify-email', { token }).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  getProfile(): Observable<IUser> {
    return this.#http.get<{ data: IUser }>('auth/profile').pipe(
      map((res) => res.data),
      tap((user) => this.#store.dispatch(authActions.signIn({ user }))),
      catchError(() => of())
    );
  }
}
