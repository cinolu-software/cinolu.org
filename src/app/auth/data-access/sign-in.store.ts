import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IUser } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ISignInPayload } from '../utils/types/sign-in.type';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

interface ISignInStore {
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
}

export const SignInStore = signalStore(
  withState<ISignInStore>({
    isLoading: false,
    error: null,
    user: null
  }),
  withMethods((store, authService = inject(AuthService)) => ({
    signIn: rxMethod<{ payload: ISignInPayload; redirectUrl: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((params) => {
          return authService.signIn(params.payload, params.redirectUrl).pipe(
            map((user) => patchState(store, { isLoading: false, user, error: null })),
            catchError(() => {
              patchState(store, { isLoading: false, error: 'Erreur lors de la connexion', user: null });
              return of();
            })
          );
        })
      )
    )
  }))
);
