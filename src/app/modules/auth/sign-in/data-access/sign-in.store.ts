import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { ISignInStore } from '../types/sign-in-store.interface';
import { mergeMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { IUser } from 'app/core/types/models.interface';
import { authActions } from 'app/core/auth/data-access/auth.actions';
import { IUserCredentials } from '../types/sign-in-payload.interface';

@Injectable()
export class SignInStore extends ComponentStore<ISignInStore> {
  state$: Observable<ISignInStore> = this.select((state) => state);
  private _authService = inject(AuthService);
  private _store = inject(Store);

  constructor() {
    super({ isLoading: false, error: null });
  }

  private _setLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  private _setError = this.updater((state, error: string) => ({ ...state, error }));

  readonly signIn = this.effect((payload$: Observable<IUserCredentials>) => {
    return payload$.pipe(
      tap(() => this._setLoading(true)),
      mergeMap((payload: IUserCredentials) =>
        this._authService.signIn(payload).pipe(
          tapResponse({
            next: (user: IUser) => this._store.dispatch(authActions.authenticateUser({ user })),
            error: (error: HttpErrorResponse) => this._setError(error.error.message),
            finalize: () => this._setLoading(false)
          })
        )
      )
    );
  });
}
