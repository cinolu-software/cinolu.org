import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { mergeMap, Observable, tap } from 'rxjs';
import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';
import { AuthService } from 'app/core/auth/auth.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IResetPasswordStore } from '../types/reset-password-store.interface';
import { IResetPasswordPayload } from '../types/reset-password-payload.interface';

@Injectable()
export class ResetPasswordStore extends ComponentStore<IResetPasswordStore> {
  state$: Observable<IResetPasswordStore> = this.select((state) => state);
  private _authService = inject(AuthService);

  constructor() {
    super({ isLoading: false, error: '', errors: [] });
  }

  private _setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  private _setError = this.updater((state, error: string) => ({ ...state, error }));
  private _setErrors = this.updater((state, errors: IAPIValidationError[]) => ({ ...state, errors }));

  resetPassword = this.effect((payload$: Observable<IResetPasswordPayload>) =>
    payload$.pipe(
      tap(() => this._setIsLoading(true)),
      mergeMap((payload: IResetPasswordPayload) =>
        this._authService.resetPassword(payload).pipe(
          tapResponse({
            next: () => this._setIsLoading(false),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message !== 'string') this._setErrors(message);
              this._setError(message);
            },
            finalize: () => this._setIsLoading(false)
          })
        )
      )
    )
  );
}
