import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IForgotPasswordStore } from './types/forgot-password-store.type';
import { AuthService } from '../../auth.service';
import { Observable, switchMap, tap } from 'rxjs';
import { IForgotPassword } from './types/forgot-password.type';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordStore extends ComponentStore<IForgotPasswordStore> {
  state$ = this.state$;
  private _authService = inject(AuthService);

  constructor() {
    super({ isLoading: false, error: null, success: null });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string | null) => ({ ...state, error }));
  setSuccess = this.updater((state, success: string | null) => ({ ...state, success }));

  forgotPassword = this.effect((payload$: Observable<IForgotPassword>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap((payload) =>
        this._authService.forgotPassword(payload).pipe(
          tapResponse({
            next: () =>
              this.setSuccess('Le lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.'),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
