import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private _authService: AuthService = inject(AuthService);
  private _actions$ = inject(Actions);

  authenticate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.authentication),
      mergeMap(() =>
        this._authService.authenticate().pipe(
          map((user) => authActions.authenticateUser({ user })),
          catchError(() => of())
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.signOut),
      mergeMap(() =>
        this._authService.signOut().pipe(
          map(() => authActions.signoutSuccess()),
          catchError(() => of())
        )
      )
    )
  );
}
