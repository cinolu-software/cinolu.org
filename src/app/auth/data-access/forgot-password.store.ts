import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { IForgotPasswordPayload } from '../utils/types/forgot-password.type';

interface IForgotPasswordStore {
  isLoading: boolean;
  error: string | null;
}

export const ForgotPasswordStore = signalStore(
  withState<IForgotPasswordStore>({
    isLoading: false,
    error: null
  }),
  withMethods((store, authService = inject(AuthService)) => ({
    forgotPassword: rxMethod<IForgotPasswordPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((payload) => {
          return authService.forgotPassword(payload).pipe(
            map(() => patchState(store, { isLoading: false, error: null })),
            catchError(() => {
              patchState(store, { isLoading: false, error: 'Une erreur est survenue sur le serveur' });
              return of();
            })
          );
        })
      )
    )
  }))
);
