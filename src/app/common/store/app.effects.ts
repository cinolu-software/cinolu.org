import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from 'app/pages/auth/auth.service';
import { authActions } from './app.actions';

@Injectable()
export class AuthEffects {
  private _actions$: Actions = inject(Actions);
  private _authService = inject(AuthService);

  authenticate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.authentication),
      exhaustMap(() =>
        this._authService.getProfile().result$.pipe(
          map(({ data }) => authActions.authenticateUser({ user: data })),
          catchError(() => of())
        )
      )
    )
  );
}
