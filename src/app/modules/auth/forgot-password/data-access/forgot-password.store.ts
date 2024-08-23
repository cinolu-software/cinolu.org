import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IForgotPasswordStore } from '../types/forgot-password-store.interface';
import { mergeMap, Observable, tap } from 'rxjs';
import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';
import { IForgotPasswordPayload } from '../types/forgot-password-payload.interface';
import { AuthService } from 'app/core/auth/auth.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ForgotPasswordStore extends ComponentStore<IForgotPasswordStore> {
  state$: Observable<IForgotPasswordStore> = this.select((state) => state);
  private _authService = inject(AuthService);

  constructor() {
    super({ isLoading: false, error: '', errors: [] });
  }

  private _setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  private _setError = this.updater((state, error: string) => ({ ...state, error }));
  private _setErrors = this.updater((state, errors: IAPIValidationError[]) => ({ ...state, errors }));

  forgotPassword = this.effect((payload$: Observable<IForgotPasswordPayload>) =>
    payload$.pipe(
      tap(() => this._setIsLoading(true)),
      mergeMap((payload: IForgotPasswordPayload) =>
        this._authService.forgotPassword(payload).pipe(
          tapResponse({
            next: () => this._setIsLoading(false),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message !== 'string') this._setErrors(message);
              else this._setError(message);
            },
            finalize: () => this._setIsLoading(false)
          })
        )
      )
    )
  );
}
