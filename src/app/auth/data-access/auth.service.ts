import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'app/shared/utils/types/models.type';
import { ISignIn } from '../utils/types/sign-in.type';
import { IResetPassword } from '../utils/types/reset-password.type';
import { IForgotPassword } from '../utils/types/forgot-password.type';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { authActions } from '../../shared/store/auth/auth.actions';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #router = inject(Router);
  #store = inject(Store);
  #toast = inject(MessageService);
  #apiService = inject(APIService);

  signIn(payload: ISignIn, redirectUrl: string): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser) => {
      this.#toast.add({ severity: 'success', summary: `Bienvenue ${user.name}` });
      this.#store.dispatch(authActions.signIn({ user }));
      this.#router.navigateByUrl(redirectUrl);
    };
    const onError = (error: string) => {
      this.#toast.add({ severity: 'error', summary: error });
    };
    return this.#apiService.post('auth/sign-in', payload, onSuccess, onError);
  }

  forgotPassword(payload: IForgotPassword): Observable<IAPIResponse<void>> {
    const onSuccess = () => {
      this.#toast.add({ severity: 'success', summary: 'Lien est envoyé à par e-mail' });
    };
    const onError = (error: string) => {
      this.#toast.add({ severity: 'error', summary: error });
    };
    return this.#apiService.post('auth/forgot-password', payload, onSuccess, onError);
  }

  resetPassword(payload: IResetPassword): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#toast.add({ severity: 'success', summary: 'Réinitialisation réussie' });
      this.#router.navigate(['/sign-in']);
    };
    const onError = (error: string) => {
      this.#toast.add({ severity: 'error', summary: error });
    };
    return this.#apiService.post('auth/reset-password', payload, onSuccess, onError);
  }

  getProfile(): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser) => this.#store.dispatch(authActions.signIn({ user }));
    return this.#apiService.get('auth/profile', null, onSuccess);
  }

  signOut(): Observable<IAPIResponse<void>> {
    const onSuccess = (): void => {
      this.#toast.add({ severity: 'success', summary: 'Déconnexion réussie' });
      this.#store.dispatch(authActions.signIn({ user: null }));
      this.#router.navigate(['/sign-in']);
    };
    const onError = (error: string) => {
      this.#toast.add({ severity: 'error', summary: error });
    };
    return this.#apiService.post('auth/sign-out', {}, onSuccess, onError);
  }
}