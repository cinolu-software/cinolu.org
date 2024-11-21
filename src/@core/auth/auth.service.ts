import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'app/common/types/models.type';
import { ISignIn } from '../../app/pages/auth/types/sign-in.type';
import { ISignUp } from '../../app/pages/auth/types/sign-up.type';
import { IResetPassword } from '../../app/pages/auth/types/reset-password.type';
import { IForgotPassword } from '../../app/pages/auth/types/forgot-password.type';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from './auth.actions';
import { HotToastService } from '@ngneat/hot-toast';
import { APIService } from '../services/api/api.service';
import { IAPIResponse } from '../services/api/types/api-response.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #router = inject(Router);
  #store = inject(Store);
  #toast = inject(HotToastService);
  #apiService = inject(APIService);

  signUp(payload: ISignUp): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#toast.success('Inscription réussie');
      this.#router.navigate(['/confirmation-required', { email: payload.email }]);
    };
    return this.#apiService.postData('auth/sign-up', payload, onSuccess);
  }

  signIn(payload: ISignIn): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser) => {
      this.#toast.success('Bienvenue ' + user.name);
      this.#store.dispatch(authActions.signIn({ user }));
      this.#router.navigate(['/']);
    };
    return this.#apiService.postData('auth/sign-in', payload, onSuccess);
  }

  forgotPassword(payload: IForgotPassword): Observable<IAPIResponse<void>> {
    return this.#apiService.postData('auth/forgot-password', payload);
  }

  resetPassword(payload: IResetPassword): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#toast.success('Réinitialisation réussie');
      this.#router.navigate(['/sign-in']);
    };
    return this.#apiService.postData('auth/reset-password', payload, onSuccess);
  }

  resendEmailVerification(email: string): Observable<IAPIResponse<void>> {
    return this.#apiService.postData('auth/verify-email/resend-token', { email });
  }

  verifyEmail(token: string): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#router.navigate(['/sign-in']);
    };
    return this.#apiService.postData('auth/verify-email', { token }, onSuccess);
  }

  getProfile(): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser) => {
      this.#store.dispatch(authActions.signIn({ user }));
    };
    return this.#apiService.fetchData('auth/profile', null, onSuccess);
  }
}
