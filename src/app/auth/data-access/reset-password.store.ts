import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { IResetPasswordPayload } from '../utils/types/reset-password.type';
import { IUser } from '../../shared/utils/types/models.type';

interface IResetPasswordStore {
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
}

export const ResetPasswordStore = signalStore(
  withState<IResetPasswordStore>({
    isLoading: false,
    error: null,
    user: null
  }),
  withMethods((store, authService = inject(AuthService)) => ({
    resetPassword: rxMethod<IResetPasswordPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((payload) => {
          return authService.resetPassword(payload).pipe(
            map((user) => patchState(store, { isLoading: false, user, error: null })),
            catchError(() => {
              patchState(store, {
                isLoading: false,
                user: null,
                error: 'Une erreur est survenue sur le serveur'
              });
              return of();
            })
          );
        })
      )
    )
  }))
);
