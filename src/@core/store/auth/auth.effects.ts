import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { authActions } from './auth.actions';
import { AuthService } from 'app/pages/auth/auth.service';

export class AuthEffects {
  #actions$ = inject(Actions);
  #authService = inject(AuthService);

  authenticate$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(authActions.authentication),
      exhaustMap(() =>
        this.#authService.getProfile().pipe(
          map((user) => authActions.authenticateUser({ user })),
          catchError(() => of())
        )
      )
    )
  );
}
