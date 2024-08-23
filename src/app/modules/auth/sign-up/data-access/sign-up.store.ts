import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { mergeMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { IUser } from 'app/core/types/models.interface';
import { authActions } from 'app/core/auth/data-access/auth.actions';
import { ISignUpPayload } from '../types/sign-up-payload.interface';
import { ISignUpStore } from '../types/sign-up-store.interface';
import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';

@Injectable()
export class SignUpStore extends ComponentStore<ISignUpStore> {
  state$: Observable<ISignUpStore> = this.select((state) => state);
  private _authService = inject(AuthService);
  private _store = inject(Store);

  constructor() {
    super({ isLoading: false, error: null, errors: [] });
  }

  private _setLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  private _setError = this.updater((state, error: string) => ({ ...state, error }));
  private _setErrors = this.updater((state, errors: IAPIValidationError[]) => ({ ...state, errors }));

  readonly signUp = this.effect((payload$: Observable<ISignUpPayload>) => {
    return payload$.pipe(
      tap(() => this._setLoading(true)),
      mergeMap((payload: ISignUpPayload) =>
        this._authService.signUp(payload).pipe(
          tapResponse({
            next: (user: IUser) => this._store.dispatch(authActions.authenticateUser({ user })),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message !== 'string') this._setErrors(message);
              else this._setError(message);
            },
            finalize: () => this._setLoading(false)
          })
        )
      )
    );
  });
}
