import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from 'app/pages/auth/auth.service';
import { authActions } from './app.actions';

@Injectable()
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
