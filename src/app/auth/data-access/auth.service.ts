import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ISignInPayload } from '../utils/types/sign-in.type';
import { IResetPasswordPayload } from '../utils/types/reset-password.type';
import { IForgotPasswordPayload } from '../utils/types/forgot-password.type';
import { Router } from '@angular/router';
import { IUser } from '../../shared/utils/types/models.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { AuthStore } from '../../shared/store/auth.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #router = inject(Router);
  #toast = inject(ToastrService);
  #http = inject(HttpClient);
  #store = inject(AuthStore);

  signIn(payload: ISignInPayload, redirectUrl: string): Observable<IUser | null> {
    return this.#http.post<{ data: IUser }>('auth/sign-in', payload).pipe(
      map(({ data }) => {
        this.#toast.showSuccess('Connexion réussie');
        this.#router.navigateByUrl(redirectUrl);
        return data;
      }),
      catchError(() => {
        this.#toast.showError('Erreur de connexion');
        return of(null);
      })
    );
  }

  getProfile(): Observable<void | null> {
    return this.#http.get<{ data: IUser }>('auth/profile').pipe(
      map(({ data }) => this.#store.setUser(data)),
      catchError(() => of(null))
    );
  }

  forgotPassword(payload: IForgotPasswordPayload): Observable<void | null> {
    return this.#http.post<{ data: IUser }>('auth/forgot-password', payload).pipe(
      map(() => this.#toast.showSuccess('Lien de réinitialisation envoyé par e-mail')),
      catchError(() => {
        this.#toast.showError('Erreur lors de la réinitialisation');
        return of(null);
      })
    );
  }

  resetPassword(payload: IResetPasswordPayload): Observable<IUser | null> {
    return this.#http.post<{ data: IUser }>('auth/reset-password', payload).pipe(
      map(({ data }) => {
        this.#toast.showSuccess('Mot de passe réinitialisé avec succès');
        this.#router.navigate(['/sign-in']);
        return data;
      }),
      catchError(() => {
        this.#toast.showError('Erreur lors de la réinitialisation du mot de passe');
        return of(null);
      })
    );
  }

  signOut(): Observable<void | null> {
    return this.#http.post('auth/sign-out', {}).pipe(
      map(() => {
        this.#toast.showSuccess('Déconnexion réussie');
        this.#store.setUser(null);
        this.#router.navigate(['/sign-in']);
      }),
      catchError(() => {
        this.#toast.showError('Erreur de déconnexion');
        return of(null);
      })
    );
  }
}
