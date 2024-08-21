import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { authActions } from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authenticateEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.authentication),
      exhaustMap(() =>
        authService.authenticate().pipe(
          map((user) => authActions.authenticateUser({ user })),
          catchError(() => of())
        )
      )
    ),
  { functional: true }
);

export const signOutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.signOut),
      exhaustMap(() =>
        authService.signOut().pipe(
          map(() => router.navigateByUrl('/auth/login')),
          map(() => authActions.authenticateUser({ user: null })),
          catchError(() => of())
        )
      )
    ),
  { functional: true }
);
