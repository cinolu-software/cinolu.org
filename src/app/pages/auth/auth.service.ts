import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '@core/types/models.type';
import { ISignIn } from './types/sign-in.type';
import { ISignUp } from './types/sign-up.type';
import { IResetPassword } from './types/reset-password.type';
import { IForgotPassword } from './types/forgot-password.type';
import { injectMutation, injectQuery, MutationResult, ObservableQueryResult } from '@ngneat/query';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #mutation = injectMutation();
  #query = injectQuery();
  #httpClient = inject(HttpClient);
  #router = inject(Router);

  signUp(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationFn: (payload: ISignUp) =>
        this.#httpClient.post<{ data: IUser }>('auth/sign-up', payload).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  signIn(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationFn: (payload: ISignIn) =>
        this.#httpClient.post<{ data: IUser }>('auth/sign-in', payload).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/'])
    });
  }

  signOut(): MutationResult<object, Error, unknown, unknown> {
    return this.#mutation({
      mutationFn: () => this.#httpClient.post('auth/sign-out', {}),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  forgotPassword(): MutationResult<void, Error, unknown> {
    return this.#mutation({
      mutationFn: (email: IForgotPassword) => this.#httpClient.post<void>('auth/forgot-password', email),
      onSuccess: () => this.#router.navigate(['/reset-password'])
    });
  }

  resetPassword(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationFn: (payload: IResetPassword) =>
        this.#httpClient.post<{ data: IUser }>('auth/reset-password', payload).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  resendEmailVerification(): MutationResult<void, Error, unknown> {
    return this.#mutation({
      mutationFn: (email: string) => this.#httpClient.post<void>('auth/verify-email/resend-token', { email })
    });
  }

  verifyEmail(): MutationResult<IUser, Error, unknown> {
    return this.#mutation({
      mutationFn: (token: string) =>
        this.#httpClient.post<{ data: IUser }>('auth/verify-email', { token }).pipe(map((res) => res.data)),
      onSuccess: () => this.#router.navigate(['/sign-in'])
    });
  }

  getUser(): ObservableQueryResult<IUser, Error> {
    return this.#query({
      queryKey: ['user'] as const,
      queryFn: () => this.#httpClient.get<{ data: IUser }>('auth/profile').pipe(map((res) => res.data))
    }).result$;
  }

  getProfile(): Observable<IUser> {
    return this.#httpClient.get<{ data: IUser }>('auth/profile').pipe(map((res) => res.data));
  }
}
