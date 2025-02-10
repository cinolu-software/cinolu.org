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
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #router = inject(Router);
  #store = inject(Store);
  #toast = inject(ToastrService);
  #apiService = inject(APIService);

  signIn(payload: ISignIn): Observable<IAPIResponse<[IUser, string]>> {
    const onSuccess = (data: [IUser, string]) => {
      const [user] = data;
      this.#toast.success('Bienvenue ' + user.name);
      this.#store.dispatch(authActions.signIn({ user }));
      this.#router.navigate(['/']);
    };
    return this.#apiService.post('auth/sign-in', payload, onSuccess);
  }

  forgotPassword(payload: IForgotPassword): Observable<IAPIResponse<void>> {
    return this.#apiService.post('auth/forgot-password', payload);
  }

  resetPassword(payload: IResetPassword): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#toast.success('Réinitialisation réussie');
      this.#router.navigate(['/sign-in']);
    };
    return this.#apiService.post('auth/reset-password', payload, onSuccess);
  }

  getProfile(): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser) => this.#store.dispatch(authActions.signIn({ user }));
    return this.#apiService.get('auth/profile', null, onSuccess);
  }

  signOut(): Observable<IAPIResponse<void>> {
    const onSuccess = (): void => {
      this.#store.dispatch(authActions.signIn({ user: null }));
      this.#router.navigate(['/sign-in']);
    };
    return this.#apiService.post('auth/sign-out', {}, onSuccess);
  }
}
