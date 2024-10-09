import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ISigninStore } from './types/sing-in-store.type';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { ISignInPayload } from './types/sign-in.type';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { authActions } from 'app/common/store/app.actions';

@Injectable({
  providedIn: 'root'
})
export class SignInStore extends ComponentStore<ISigninStore> {
  state$ = this.state$;
  private _authService = inject(AuthService);
  private _store = inject(Store);
  private _router = inject(Router);

  constructor() {
    super({ isLoading: false, error: null, success: null });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string | null) => ({ ...state, error }));
  setSuccess = this.updater((state, success: string | null) => ({ ...state, success }));

  verifyEmail = this.effect((payload$: Observable<string>) =>
    payload$.pipe(
      switchMap((token) =>
        this._authService.verifyEmail(token).pipe(
          tapResponse({
            next: () => this.setSuccess('Votre email a été vérifié avec succès.'),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );

  signIn = this.effect((payload$: Observable<ISignInPayload>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap((payload) =>
        this._authService.signIn(payload).pipe(
          tapResponse({
            next: (user) => {
              this._store.dispatch(authActions.authenticateUser({ user }));
              this._router.navigate(['/']);
            },
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
